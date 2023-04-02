
export class DropdownButtonOptions {
    label: any;
    value: any;
    description?: string;
}

export class DropdownButtonBind {
    options?: DropdownButtonOptions[] = [];
    effectValue?: boolean = false;
    defaultLabel: any;
    classBtn?: string = 'btn btn-flat-dark';
}
