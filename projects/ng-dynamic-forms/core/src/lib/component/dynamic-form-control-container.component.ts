import {
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    OnChanges,
    OnDestroy,
    QueryList,
    SimpleChange,
    SimpleChanges,
    Type,
    ViewContainerRef
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlEvent,
    DynamicFormControlEventType,
    isDynamicFormControlEvent
} from "./dynamic-form-control.event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayGroupModel
} from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX } from "../model/checkbox/dynamic-checkbox.model";
import {
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DynamicInputModel
} from "../model/input/dynamic-input.model";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormControl } from "./dynamic-form-control.interface";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicFormComponentService } from "../service/dynamic-form-component.service";
import { isString } from "../utils/core.utils";
import { DynamicFormRelationService } from "../service/dynamic-form-relation.service";
import {
    DYNAMIC_FORM_CONTROL_TYPE_LAYOUT_GROUP,
    DynamicFormLayoutGroupModel
} from "../model/form-layout-group/dynamic-form-layout-group.model";


export abstract class DynamicFormControlContainerComponent implements OnChanges, OnDestroy {

    context: DynamicFormArrayGroupModel | null = null;
    control: FormControl;
    group: FormGroup;
    hasFocus: boolean;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;

    contentTemplateList: QueryList<DynamicTemplateDirective> | undefined;
    inputTemplateList: QueryList<DynamicTemplateDirective> | undefined;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent> | undefined;
    focus: EventEmitter<DynamicFormControlEvent>;

    componentViewContainerRef: ViewContainerRef;

    protected componentRef: ComponentRef<DynamicFormControl>;
    //protected viewRefs: EmbeddedViewRef<DynamicFormControlModel>[] = [];
    protected componentSubscriptions: Subscription[] = [];
    protected subscriptions: Subscription[] = [];

    protected constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                          protected layoutService: DynamicFormLayoutService,
                          protected validationService: DynamicFormValidationService,
                          protected componentService: DynamicFormComponentService,
                          protected relationService: DynamicFormRelationService) {
    }

    ngOnChanges(changes: SimpleChanges) {

        let groupChange = changes["group"] as SimpleChange,
            modelChange = changes["model"] as SimpleChange;

        if (modelChange) {

            this.destroyFormControlComponent();
            //this.removeTemplates();

            this.createFormControlComponent();
            //this.embedTemplates();
        }

        if (groupChange || modelChange) {

            if (this.model && !(this.model.type === DYNAMIC_FORM_CONTROL_TYPE_LAYOUT_GROUP)) {

                this.unsubscribe();

                if (this.group) {

                    this.control = this.group.get(this.model.id) as FormControl;
                    this.subscriptions.push(this.control.valueChanges.subscribe(value => this.onControlValueChanges(value)));
                }

                this.subscriptions.push(this.model.disabledUpdates.subscribe(value => this.onModelDisabledUpdates(value)));

                if (this.model instanceof DynamicFormValueControlModel) {

                    let model = this.model as DynamicFormValueControlModel<any>;

                    this.subscriptions.push(model.valueUpdates.subscribe(value => this.onModelValueUpdates(value)));
                }

                if (this.model.relations.length > 0) {

                    this.subscriptions.push(...this.relationService.subscribeRelations(this.model, this.group, this.control));
                }
            }
        }
    }

    ngOnDestroy() {

        this.destroyFormControlComponent();
        this.unsubscribe();
    }

    abstract get componentType(): Type<DynamicFormControl> | null;

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get hasHint(): boolean {
        return isString((this.model as DynamicFormValueControlModel<any>).hint);
    }

    get hint(): string | null {
        return (this.model as DynamicFormValueControlModel<any>).hint || null;
    }

    get hasLabel(): boolean {
        return isString(this.model.label);
    }

    get isCheckbox(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    get elementId(): string {
        return this.layoutService.getElementId(this.model);
    }

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.model.hasErrorMessages && this.control.touched && !this.hasFocus && this.isInvalid;
    }

    get templates(): QueryList<DynamicTemplateDirective> | undefined {
        return this.inputTemplateList !== undefined ? this.inputTemplateList : this.contentTemplateList;
    }

    get startTemplate(): DynamicTemplateDirective | undefined {
        return this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_ARRAY ?
            this.layoutService.getStartTemplate(this.model, this.templates) : undefined;
    }

    get endTemplate(): DynamicTemplateDirective | undefined {
        return this.model.type !== DYNAMIC_FORM_CONTROL_TYPE_ARRAY ?
            this.layoutService.getEndTemplate(this.model, this.templates) : undefined;
    }

    getClass(context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace, model: DynamicFormControlModel = this.model): string {

        let controlLayout = this.layoutService.findByModel(model, this.layout) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    protected createFormControlComponent(): void {

        let componentType = this.componentType;

        if (componentType !== null) {

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

            this.componentViewContainerRef.clear();
            this.componentRef = this.componentViewContainerRef.createComponent(componentFactory);

            let instance = this.componentRef.instance;

            instance.group = this.group;
            instance.layout = this.layout;
            instance.model = this.model as any;

            if (this.templates) {
                instance.templates = this.templates;
            }

            this.componentSubscriptions.push(instance.blur.subscribe(($event: any) => this.onBlur($event)));
            this.componentSubscriptions.push(instance.change.subscribe(($event: any) => this.onChange($event)));
            this.componentSubscriptions.push(instance.focus.subscribe(($event: any) => this.onFocus($event)));

            if (instance.customEvent !== undefined) {
                this.componentSubscriptions.push(
                    instance.customEvent.subscribe(($event: any) => this.onCustomEvent($event)));
            }

            this.registerComponentRef(this.componentRef);
        }
    }

    protected destroyFormControlComponent(): void {

        if (this.componentRef) {

            this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.componentSubscriptions = [];

            this.unregisterComponentRef();
            this.componentRef.destroy();
        }
    }

    /*
    protected embedTemplates(): void {

        const templates = this.layoutService.getIndexedTemplates(this.model, this.templates);

        if (Array.isArray(templates)) {

            templates.forEach(template => {

                const viewRef = this.componentViewContainerRef.createEmbeddedView(template.templateRef, this.model, template.index);
                this.viewRefs.push(viewRef);
            });
        }
    }

    protected removeTemplates(): void {
        this.viewRefs.forEach(viewRef => this.componentViewContainerRef.remove(this.componentViewContainerRef.indexOf(viewRef)));
    }
    */

    protected createDynamicFormControlEvent($event: any, type: string): DynamicFormControlEvent {
        return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }

    unsubscribe(): void {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onControlValueChanges(value: any): void {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = this.model as DynamicFormValueControlModel<any>;

            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
    }

    onModelValueUpdates(value: any): void {

        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onChange($event: Event | DynamicFormControlEvent | any): void {

        if ($event && $event instanceof Event) { // native HTML5 change event

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {

                    let inputElement: any = $event.target || $event.srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Change));

        } else if (isDynamicFormControlEvent($event)) { // event bypass

            this.change.emit($event);

        } else { // custom library value change event

            this.change.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Change));
        }
    }

    onBlur($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.blur.emit($event);

        } else { // native HTML 5 or UI library blur event

            this.hasFocus = false;
            this.blur.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Blur));
        }
    }

    onFocus($event: FocusEvent | DynamicFormControlEvent | any): void {

        if (isDynamicFormControlEvent($event)) { // event bypass

            this.focus.emit($event);

        } else { // native HTML 5 or UI library focus event

            this.hasFocus = true;
            this.focus.emit(this.createDynamicFormControlEvent($event, DynamicFormControlEventType.Focus));
        }
    }

    onCustomEvent($event: DynamicFormControlEvent | DynamicFormControlCustomEvent): void {

        let emitter = this.customEvent as EventEmitter<DynamicFormControlEvent>;

        if (isDynamicFormControlEvent($event)) { // child event bypass

            emitter.emit($event);

        } else { // native UI library custom event

            emitter.emit(this.createDynamicFormControlEvent($event.customEvent, $event.customEventType));
        }
    }

    private registerComponentRef(instanceRef: ComponentRef<DynamicFormControl>): void {

        let index;

        if (this.context && this.context instanceof DynamicFormArrayGroupModel) {
            index = this.context.index;
        }

        this.componentService.registerFormControlRef(this.model, instanceRef, index);
    }

    private unregisterComponentRef(): void {

        let index;

        if (this.context && this.context instanceof DynamicFormArrayGroupModel) {
            index = this.context.index;
        }

        this.componentService.unregisterFormControlRef(this.model.id, index);
    }
}
