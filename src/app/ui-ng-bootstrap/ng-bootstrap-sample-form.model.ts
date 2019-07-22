import {
    DynamicCheckboxGroupModel,
    DynamicCheckboxModel,
    DynamicDatePickerModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormLayoutGroupModel,
    LayoutGroupLayoutType,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel,
    GroupLayoutType
} from '@ng-dynamic-forms/core';
import {MATCH_DISABLED, OR_OPERATOR} from '../../../projects/ng-dynamic-forms/core/src/lib/model/misc/dynamic-form-control-relation.model';


export const NG_BOOTSTRAP_SAMPLE_FORM_MODEL: DynamicFormControlModel[] = [
    new DynamicFormGroupModel(
        {
            id: 'tabset',
            layoutType: GroupLayoutType.tabset,
            legend: 'tabset',
            tabs: [
                new DynamicFormLayoutGroupModel(
                    {
                        id: 'tab1',
                        layoutType: LayoutGroupLayoutType.tab,
                        legend: 'tab 1',
                        layoutGroup: [
                            new DynamicFormGroupModel(
                                {
                                    id: 'entitaetsgruppe1',
                                    legend: 'Entitaetsgruppe 1',
                                    group: [
                                        new DynamicDatePickerModel ({
                                                id: 'datepicker',
                                                label: 'Datum',
                                                placeholder: 'TT.MM.JJJJ',
                                                value: '01.07.2019',
                                                inline: false,
                                                toggleIcon: 'content/calendar-icon.svg',
                                                tooltip: 'tooltip',
                                                helpId: '1222',
                                                disabled: false,
                                                // focusedDate: f.standardwert || ""
                                            }),
                                        new DynamicSelectModel(
                                            {
                                                id: 'roomSize',
                                                label: 'Room Size',
                                                options: [
                                                    {
                                                        label: 'Single Room',
                                                        value: 'single-room'
                                                    },
                                                    {
                                                        label: 'Double Room',
                                                        value: 'double-room'
                                                    },
                                                    {
                                                        label: 'Business Suite',
                                                        value: 'business-suite'
                                                    },
                                                    {
                                                        label: 'Presidential Suite',
                                                        value: 'presidential-suite'
                                                    },
                                                    {
                                                        label: 'Storeroom',
                                                        value: 'storeroom'
                                                    }
                                                ],
                                                value: 'single-room',
                                                relations: [
                                                    {
                                                        match: MATCH_DISABLED,
                                                        operator: OR_OPERATOR,
                                                        when: [
                                                            {id: 'beds', value: 3},
                                                            {id: 'beds', value: 4}
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                element: {
                                                    label: 'col-form-label'
                                                },
                                                grid: {
                                                    host: 'col-sm-6'
                                                }
                                            }
                                        ),
                                        new DynamicSelectModel(
                                            {
                                                id: 'beds',
                                                label: 'betten',
                                                options: [
                                                    {
                                                        label: 'Einzel',
                                                        value: 1
                                                    },
                                                    {
                                                        label: 'doppe',
                                                        value: 2
                                                    },
                                                    {
                                                        label: 'Drei-Bett',
                                                        value: 3
                                                    },
                                                    {
                                                        label: 'Vier Bett',
                                                        value: 4
                                                    }
                                                ],
                                                value: 1
                                            },
                                            {
                                                element: {
                                                    label: 'col-form-label'
                                                },
                                                grid: {
                                                    host: 'col-sm-6'
                                                }
                                            }
                                        ),
                                        new DynamicInputModel(
                                            {
                                                id: 'roomQuantity',
                                                inputType: 'number',
                                                label: 'Quantity',
                                                placeholder: 'Quantity',
                                                hint: 'Maximum: 5',
                                                max: 5,
                                                min: 0,
                                                value: 1,
                                                helpId: '9238457676',
                                                relations: [
                                                    {
                                                        match: MATCH_DISABLED,
                                                        operator: OR_OPERATOR,
                                                        when: [
                                                            {id: 'roomSize', value: 'storeroom', rootPath: 'tabset.entitaetsgruppe1.roomSize'},
                                                            {id: 'roomSize', value: 'presidential-suite', rootPath: 'tabset.entitaetsgruppe1.roomSize'}
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                element: {
                                                    container: 'text-center',
                                                    label: 'col-form-label'
                                                },
                                                grid: {
                                                    host: 'col-sm-2'
                                                }
                                            }
                                        ),
                                        new DynamicFormLayoutGroupModel({
                                            id: 'LayoutGroupInTab',
                                            legend: 'LayoutGroupInTab',
                                            layoutType: LayoutGroupLayoutType.card_with_header,
                                            layoutGroup: [
                                                new DynamicInputModel({

                                                    id: 'dogName',
                                                    label: 'dog name',
                                                    placeholder: 'dog name',
                                                    validators: {
                                                        required: null
                                                    },
                                                    errorMessages: {
                                                        required: '{{ label }} is required'
                                                    },
                                                    relations: [
                                                        {
                                                            match: MATCH_DISABLED,
                                                            when: [
                                                                {id: 'roomSize', value: 'storeroom', rootPath: 'tabset.entitaetsgruppe1.roomSize'}
                                                            ]
                                                        }
                                                    ]
                                                })
                                            ]
                                        })
                                    ]

                                }
                            )
                        ]
                    }
                ),
                new DynamicFormLayoutGroupModel(
                    {
                        id: 'tab 2',
                        layoutType: LayoutGroupLayoutType.tab,
                        legend: 'tab 2',
                        layoutGroup: [
                            new DynamicFormGroupModel(
                                {
                                    id: 'Entitaetsgruppe2',
                                    legend: 'Entitaetsgruppe 2',
                                    group: [
                                        new DynamicInputModel(
                                            {
                                                id: 'firstName',
                                                label: 'First Name',
                                                placeholder: 'First Name',
                                                validators: {
                                                    required: null
                                                },
                                                errorMessages: {
                                                    required: '{{ label }} is required'
                                                }
                                                ,
                                                relations: [
                                                    {
                                                        match: MATCH_DISABLED,
                                                        when: [
                                                            {id: 'roomSize', value: 'storeroom', rootPath: 'tabset.entitaetsgruppe1.roomSize'}
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                element: {
                                                    label: 'col-form-label'
                                                }
                                            }
                                        ),

                                        new DynamicInputModel(
                                            {
                                                id: 'lastName',
                                                label: 'Last Name',
                                                placeholder: 'Last Name',
                                                validators: {
                                                    required: null
                                                },
                                                errorMessages: {
                                                    required: '{{ label }} is required'
                                                }
                                            },
                                            {
                                                element: {
                                                    label: 'col-form-label'
                                                }
                                            }
                                        )
                                    ]
                                })]
                    })
            ]

        }
    ),
    // gruppe unter den Tabs
    new DynamicFormGroupModel({
        layoutType: GroupLayoutType.card_with_header,
        legend: 'gruppe unter den Tabs',
        id: 'stay',
        group: [
            new DynamicFormLayoutGroupModel({
                id: 'Layout2',
                legend: 'Caption-Layout2',
                layoutType: LayoutGroupLayoutType.card_with_header,
                layoutGroup: [
                    new DynamicInputModel({

                        id: 'LayoutGroupfirstName',
                        label: 'LayoutGroup First Name',
                        placeholder: 'LayoutGroup First Name',
                        validators: {
                            required: null
                        },
                        errorMessages: {
                            required: '{{ label }} is required'
                        }
                    })
                ]
            })
        ]
    }),
    // new DynamicFormGroupModel({
    //     layoutType: GroupLayoutType.card_with_header,
    //     legend: "ggg",
    //     id: "stay",
    //     group: [
    //         new DynamicDatePickerModel({
    //
    //             id: "arrivalDate",
    //             inline: false,
    //             label: "Arrival",
    //             placeholder: "Date of Arrival",
    //             toggleIcon: "./assets/calendar-icon.svg"
    //         }),
    //
    //         new DynamicDatePickerModel({
    //
    //             id: "departureDate",
    //             inline: false,
    //             label: "Departure",
    //             placeholder: "Date of Departure",
    //             toggleIcon: "./assets/calendar-icon.svg"
    //         })
    //     ]
    // }),
    // new DynamicFormGroupModel({
    //     layoutType: GroupLayoutType.card_with_header,
    //     legend: "hhh",
    //     id: "room",
    //     group: [
    //         new DynamicSelectModel({
    //
    //             id: "roomSize",
    //             label: "Room Size",
    //             options: [
    //                 {
    //                     label: "Single Room",
    //                     value: "single-room"
    //                 },
    //                 {
    //                     label: "Double Room",
    //                     value: "double-room"
    //                 },
    //                 {
    //                     label: "Business Suite",
    //                     value: "business-suite"
    //                 },
    //                 {
    //                     label: "Presidential Suite",
    //                     value: "presidential-suite"
    //                 },
    //                 {
    //                     label: "Storeroom",
    //                     value: "storeroom"
    //                 }
    //             ],
    //             value: "single-room"
    //         }),
    //
    //         new DynamicInputModel({
    //
    //             id: "roomQuantity",
    //             inputType: "number",
    //             label: "Quantity",
    //             placeholder: "Quantity",
    //             hint: "Maximum: 5",
    //             max: 5,
    //             min: 0,
    //             value: 1
    //         })
    //     ]
    // }),
    //
    // new DynamicInputModel({
    //
    //     id: "firstName",
    //     label: "First Name",
    //     placeholder: "First Name",
    //     validators: {
    //         required: null
    //     },
    //     errorMessages: {
    //         required: "{{ label }} is required"
    //     }
    // }),
    //
    // new DynamicInputModel({
    //
    //     id: "lastName",
    //     label: "Last Name",
    //     placeholder: "Last Name",
    //     validators: {
    //         required: null
    //     },
    //     errorMessages: {
    //         required: "{{ label }} is required"
    //     }
    // }),
    //
    // new DynamicInputModel({
    //
    //     id: "email",
    //     label: "E-Mail",
    //     placeholder: "E-Mail",
    //     validators: {
    //         email: null
    //     },
    //     errorMessages: {
    //         email: "{{ label }} is not valid"
    //     }
    // }),
    //
    // new DynamicInputModel({
    //
    //     id: "phone",
    //     inputType: "tel",
    //     label: "Phone Number",
    //     placeholder: "Phone Number",
    //     hint: "Add your country code first",
    //     prefix: "+",
    //     validators: {
    //         required: null
    //     },
    //     errorMessages: {
    //         required: "{{ label }} is required"
    //     }
    // }),
    //
    // new DynamicFormGroupModel({
    //
    //     id: "addressStreet",
    //     group: [
    //         new DynamicInputModel({
    //
    //             id: "streetName",
    //             label: "Street Name",
    //             placeholder: "Street Name"
    //         }),
    //         new DynamicInputModel({
    //
    //             id: "streetNumber",
    //             label: "Street Number",
    //             placeholder: "Number"
    //         })
    //     ]
    // }),
    //
    // new DynamicFormGroupModel({
    //
    //     id: "addressLocation",
    //     group: [
    //         new DynamicInputModel({
    //
    //             id: "zipCode",
    //             label: "Zip Code",
    //             placeholder: "ZIP"
    //         }),
    //         new DynamicInputModel({
    //
    //             id: "state",
    //             label: "State",
    //             placeholder: "State"
    //         }),
    //         new DynamicInputModel({
    //
    //             id: "city",
    //             label: "City",
    //             placeholder: "City"
    //         })
    //     ]
    // }),
    //
    //
    //
    // new DynamicCheckboxGroupModel({
    //
    //     id: "extras",
    //     label: "Extras",
    //     group: [
    //         new DynamicCheckboxModel({
    //
    //             id: "extraBreakfast",
    //             label: "Breakfast"
    //         }),
    //         new DynamicCheckboxModel({
    //
    //             id: "extraTV",
    //             label: "TV",
    //         }),
    //         new DynamicCheckboxModel({
    //
    //             id: "extraWiFi",
    //             label: "WiFi"
    //         }),
    //         new DynamicCheckboxModel({
    //
    //             id: "extraParking",
    //             label: "Parking Lot"
    //         }),
    //         new DynamicCheckboxModel({
    //
    //             id: "extraBalcony",
    //             label: "Balcony"
    //         })
    //     ]
    // })
    //     ,
    //
    // new DynamicRadioGroupModel({
    //
    //     id: "payment",
    //     label: "Payment Method",
    //     options: [
    //         {
    //             label: "Credit Card",
    //             value: "cc"
    //         },
    //         {
    //             label: "PayPal",
    //             value: "paypal"
    //         },
    //         {
    //             label: "Cash",
    //             value: "cash"
    //         },
    //         {
    //             label: "Bitcoin",
    //             value: "bitcoin"
    //         }
    //     ],
    //     value: "cc"
    // }),
    //
    // new DynamicTimePickerModel({
    //
    //     id: "arrivalTime",
    //     label: "Estimated Arrival Time"
    // }),
    //
    // new DynamicTextAreaModel({
    //
    //     id: "notes",
    //     label: "Personal Note",
    //     placeholder: "Personal Note",
    //     rows: 5
    // }),
    //
    // new DynamicInputModel({
    //
    //     id: "attachments",
    //     inputType: "file",
    //     label: "Attachments"
    // }),
    //
    // new DynamicRatingModel({
    //
    //     id: "feedback",
    //     label: "How did you like this form?",
    //     additional: {
    //         cancel: false
    //     }
    // }),
    //
    // new DynamicCheckboxModel({
    //
    //     id: "confirm",
    //     label: "I confirm the information given above"
    // })
];
