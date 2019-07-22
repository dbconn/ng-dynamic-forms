import { DynamicFormControlModel, DynamicFormControlModelConfig } from "../dynamic-form-control.model";
import { DynamicFormModel } from "../dynamic-form.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import {DynamicFormLayoutGroupModel} from "../form-layout-group/dynamic-form-layout-group.model";

export const enum GroupLayoutType {
    tabset = "tabset",
    card = "card",
    card_with_header = "card_with_header",
    card_with_title = "card_with_title",
    no_layout = "no_layout"
}

export const DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";

export interface DynamicFormGroupModelConfig extends DynamicFormControlModelConfig {

    group?: DynamicFormModel;
    legend?: string;
    layoutType?: GroupLayoutType;
    tabs?: DynamicFormLayoutGroupModel[];
}

export class DynamicFormGroupModel extends DynamicFormControlModel {

    @serializable() group: DynamicFormModel = [];
    @serializable() legend: string | null;
    @serializable() layoutType: GroupLayoutType;
    @serializable() tabs: DynamicFormLayoutGroupModel[] =  [];
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_GROUP;

    constructor(config: DynamicFormGroupModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.group = Array.isArray(config.group) ? config.group : [];
        this.legend = config.legend || null;
        this.layoutType = config.layoutType || null;
        this.tabs = Array.isArray(config.tabs) ? config.tabs : [];
    }

    get(index: number): DynamicFormControlModel {
        return this.group[index];
    }

    set(index: number, controlModel: DynamicFormControlModel,): void {
        this.group[index] = controlModel;
    }

    add(controlModel: DynamicFormControlModel): void {
        this.group.push(controlModel);
    }

    insert(index: number, controlModel: DynamicFormControlModel): void {
        this.group.splice(index, 0, controlModel);
    }

    move(index: number, step: number): void {
        this.group.splice(index + step, 0, ...this.group.splice(index, 1));
    }

    remove(index: number) {
        this.group.splice(index, 1);
    }

    size(): number {
        return this.group.length;
    }
}
