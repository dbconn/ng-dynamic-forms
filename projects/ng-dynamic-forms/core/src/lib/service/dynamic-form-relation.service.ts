import { Inject, Injectable, Injector, Optional } from "@angular/core";
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DYNAMIC_MATCHERS, DynamicFormControlMatcher } from "./dynamic-form-relation.matchers";
import {
    AND_OPERATOR,
    DynamicFormControlCondition,
    DynamicFormControlRelation,
    OR_OPERATOR
} from "../model/misc/dynamic-form-control-relation.model";
import { startWith } from "rxjs/operators";
import { merge, Subscription } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(@Optional() @Inject(DYNAMIC_MATCHERS) private DYNAMIC_MATCHERS: DynamicFormControlMatcher[],
                private injector: Injector) {}

    getRelatedFormControl(group: FormGroup, condition: DynamicFormControlCondition): FormControl | never {

        let control = condition.rootPath ?
            group.root.get(condition.rootPath) as FormControl : group.get(condition.id) as FormControl;
        // // sd tabübergreifende lösung
        if (control === null) {
            control = this.findControlInOtherTabs(group, condition);
        }
        if (control === null) {
            throw new Error(`No related form control with id ${condition.id} could be found`);
        }

        return control;
    }

    // sd Eigentlich wäre hier eine rekursive Lösung gut aber uns reichen zur Zeit die Controls unter den Tabs
    findControlInOtherTabs( currentTab: FormGroup, condition: DynamicFormControlCondition ) {
        //  if( currentTab.parent && currentTab.parent instanceof FormGroup) {
        const pGroup =  currentTab.parent as FormGroup;
        let control = pGroup.get(condition.id) as FormControl;
        if (control === null) {
            Object.keys(pGroup.controls).forEach(k => {
                // eigentlich wollen wir die Schleife verlassen wenn wir das Control gefunden haben ...
                // break wirft einen ts Fehler ???
                if (control === null) {
                    const child =  pGroup.get( k ) as AbstractControl;
                    control = child.get( condition.id ) as FormControl;
                }
            });
        }
        return control;
    }

    getRelatedFormControls(model: DynamicFormControlModel, group: FormGroup): { [id: string]: FormControl } | never {

        const controls: { [id: string]: FormControl } = {};

        model.relations.forEach(relation => relation.when.forEach(condition => {

            if (model.id === condition.id) {
                throw new Error(`FormControl ${model.id} cannot depend on itself`);
            }

            const control = this.getRelatedFormControl(group, condition);

            // // sd  Ergänzung wir wollen auch auf Controls aus anderen Tabs verweisen können.
            // // Wir können dies relativ entspannt tun, da unsere Control Ids unique sind.
            // if ( !control && group.parent && group.parent instanceof FormGroup) {
            //     control = this.findControlInOtherTabs( group, condition);
            // }

            if (control && !controls.hasOwnProperty(model.id)) {
                controls[condition.id] = control;
            }
        }));

        return controls;
    }

    findRelation(relations: DynamicFormControlRelation[], matcher: DynamicFormControlMatcher): DynamicFormControlRelation | null {
        return relations.find(relation => relation.match === matcher.match || relation.match === matcher.opposingMatch) || null;
    }

    matchesCondition(relation: DynamicFormControlRelation, group: FormGroup, matcher: DynamicFormControlMatcher): boolean {

        const operator = relation.operator || OR_OPERATOR;

        return relation.when.reduce((hasAlreadyMatched: boolean, condition: DynamicFormControlCondition, index: number) => {

            const relatedControl = this.getRelatedFormControl(group, condition);

            // todo related Control in anderem tab suchen mit findControlInOtherTabs

            if (relatedControl && relation.match === matcher.match) {

                if (index > 0 && operator === AND_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                if (index > 0 && operator === OR_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                return condition.value === relatedControl.value || condition.status === relatedControl.status;
            }

            if (relatedControl && relation.match === matcher.opposingMatch) {

                if (index > 0 && operator === AND_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                if (index > 0 && operator === OR_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                return !(condition.value === relatedControl.value || condition.status === relatedControl.status);
            }

            return false;

        }, false);
    }

    subscribeRelations(model: DynamicFormControlModel, group: FormGroup, control: FormControl): Subscription[] {

        const relatedFormControls = this.getRelatedFormControls(model, group), subscriptions: Subscription[] = [];

        Object.entries(relatedFormControls).forEach(([_id, relatedControl]) => {

            const valueChanges = relatedControl.valueChanges.pipe(startWith(relatedControl.value));
            const statusChanges = relatedControl.statusChanges.pipe(startWith(relatedControl.status));

            subscriptions.push(merge(valueChanges, statusChanges).subscribe(() => {

                if (Array.isArray(this.DYNAMIC_MATCHERS)) {

                    this.DYNAMIC_MATCHERS.forEach(matcher => {

                        const relation = this.findRelation(model.relations, matcher);

                        if (relation) {

                            const hasMatch = this.matchesCondition(relation, group, matcher);
                            matcher.onChange(hasMatch, model, control, this.injector);
                        }
                    });
                }
            }));
        });

        return subscriptions;
    }
}
