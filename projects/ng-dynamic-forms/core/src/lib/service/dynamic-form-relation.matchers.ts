import { InjectionToken, Injector, StaticProvider } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import {
    MATCH_DISABLED,
    MATCH_ENABLED,
    MATCH_HIDDEN,
    MATCH_OPTIONAL,
    MATCH_REQUIRED,
    MATCH_VISIBLE
} from "../model/misc/dynamic-form-control-relation.model";
import { isObject } from "../utils/core.utils";

export interface DynamicFormControlMatcher {

    match: string;
    opposingMatch: string | null;

    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void;
}

export const DYNAMIC_MATCHERS = new InjectionToken<DynamicFormControlMatcher>("DYNAMIC_MATCHERS");

export const DisabledMatcher: DynamicFormControlMatcher = {

    match: MATCH_DISABLED,
    opposingMatch: MATCH_ENABLED,
    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl): void {
        // sd Beim disablen leeren wir das Control
        if (hasMatch) {
            control.setValue(null);
        }
        model.disabledUpdates.next(hasMatch);
    }
};

export const HiddenMatcher: DynamicFormControlMatcher = {

    match: MATCH_HIDDEN,
    opposingMatch: MATCH_VISIBLE,
    onChange(hasMatch: boolean, model: DynamicFormControlModel): void {
        model.hidden = hasMatch;
    }
};

export const RequiredMatcher: DynamicFormControlMatcher = {

    match: MATCH_REQUIRED,
    opposingMatch: MATCH_OPTIONAL,
    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: FormControl, injector: Injector): void {

        let validatorsConfig = null;

        if (hasMatch) {

            validatorsConfig = isObject(model.validators) ? {...model.validators, required: null} : {required: null};

        } else {

            if (isObject(model.validators)) {

                delete model.validators["required"];
                validatorsConfig = {...model.validators};
            }
        }

        injector.get(DynamicFormValidationService).updateValidators(validatorsConfig, control, model);
    }
};

export const DISABLED_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: DisabledMatcher,
    multi: true
};

export const HIDDEN_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: HiddenMatcher,
    multi: true
};

export const REQUIRED_MATCHER: StaticProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: RequiredMatcher,
    multi: true
};
