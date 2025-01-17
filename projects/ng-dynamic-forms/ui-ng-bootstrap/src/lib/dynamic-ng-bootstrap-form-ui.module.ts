import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbTimepickerModule,
    NgbRatingModule, NgbTabsetModule, NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicNGBootstrapFormControlContainerComponent } from "./dynamic-ng-bootstrap-form-control-container.component";
import { DynamicNGBootstrapFormComponent } from "./dynamic-ng-bootstrap-form.component";
import { DynamicNGBootstrapCalendarComponent } from "./calendar/dynamic-ng-bootstrap-calendar.component";
import { DynamicNGBootstrapCheckboxComponent } from "./checkbox/dynamic-ng-bootstrap-checkbox.component";
import { DynamicNGBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ng-bootstrap-checkbox-group.component";
import { DynamicNGBootstrapDatePickerComponent } from "./datepicker/dynamic-ng-bootstrap-datepicker.component";
import { DynamicNGBootstrapFormArrayComponent } from "./form-array/dynamic-ng-bootstrap-form-array.component";
import { DynamicNGBootstrapFormGroupComponent } from "./form-group/dynamic-ng-bootstrap-form-group.component";
import { DynamicNGBootstrapInputComponent } from "./input/dynamic-ng-bootstrap-input.component";
import { DynamicNGBootstrapRadioGroupComponent } from "./radio-group/dynamic-ng-bootstrap-radio-group.component";
import { DynamicNGBootstrapRatingComponent } from "./rating/dynamic-ng-bootstrap-rating.component";
import { DynamicNGBootstrapSelectComponent } from "./select/dynamic-ng-bootstrap-select.component";
import { DynamicNGBootstrapTextAreaComponent } from "./textarea/dynamic-ng-bootstrap-textarea.component";
import { DynamicNGBootstrapTimePickerComponent } from "./timepicker/dynamic-ng-bootstrap-timepicker.component";
import {DynamicNgBootstrapFormGroupCardLayoutComponent} from "./form-group-card-layout/dynamic-ng-bootstrap-form-group-card-layout.component";
import {DynamicNgBootstrapFormLayoutGroupComponent} from "./form-layout-group/dynamic-ng-bootstrap-form-layout-group.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbButtonsModule,
        NgbDatepickerModule,
        NgbRatingModule,
        NgbTimepickerModule,
        NgbTabsetModule,
        NgbTooltipModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    // todo Layoutgroup
    declarations: [
        DynamicNGBootstrapCalendarComponent,
        DynamicNGBootstrapCheckboxComponent,
        DynamicNGBootstrapCheckboxGroupComponent,
        DynamicNGBootstrapDatePickerComponent,
        DynamicNGBootstrapFormArrayComponent,
        DynamicNGBootstrapFormComponent,
        DynamicNGBootstrapFormControlContainerComponent,
        DynamicNGBootstrapFormGroupComponent,
        DynamicNGBootstrapInputComponent,
        DynamicNGBootstrapRadioGroupComponent,
        DynamicNGBootstrapRatingComponent,
        DynamicNGBootstrapSelectComponent,
        DynamicNGBootstrapTextAreaComponent,
        DynamicNGBootstrapTimePickerComponent,
        DynamicNgBootstrapFormGroupCardLayoutComponent,
        DynamicNgBootstrapFormLayoutGroupComponent
    ],
    entryComponents: [
        DynamicNGBootstrapCalendarComponent,
        DynamicNGBootstrapCheckboxComponent,
        DynamicNGBootstrapCheckboxGroupComponent,
        DynamicNGBootstrapDatePickerComponent,
        DynamicNGBootstrapFormArrayComponent,
        DynamicNGBootstrapFormGroupComponent,
        DynamicNGBootstrapInputComponent,
        DynamicNGBootstrapRadioGroupComponent,
        DynamicNGBootstrapRatingComponent,
        DynamicNGBootstrapSelectComponent,
        DynamicNGBootstrapTextAreaComponent,
        DynamicNGBootstrapTimePickerComponent,
        DynamicNgBootstrapFormGroupCardLayoutComponent,
        DynamicNgBootstrapFormLayoutGroupComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicNGBootstrapCalendarComponent,
        DynamicNGBootstrapCheckboxComponent,
        DynamicNGBootstrapCheckboxGroupComponent,
        DynamicNGBootstrapDatePickerComponent,
        DynamicNGBootstrapFormArrayComponent,
        DynamicNGBootstrapFormComponent,
        DynamicNGBootstrapFormControlContainerComponent,
        DynamicNGBootstrapFormGroupComponent,
        DynamicNGBootstrapInputComponent,
        DynamicNGBootstrapRadioGroupComponent,
        DynamicNGBootstrapRatingComponent,
        DynamicNGBootstrapSelectComponent,
        DynamicNGBootstrapTextAreaComponent,
        DynamicNGBootstrapTimePickerComponent,
        DynamicNgBootstrapFormGroupCardLayoutComponent,
        DynamicNgBootstrapFormLayoutGroupComponent
    ]
})
export class DynamicFormsNGBootstrapUIModule {
}
