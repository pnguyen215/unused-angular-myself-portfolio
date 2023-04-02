import { PropsPrototypes } from "ngx-api-sdk";
import { BaseClass } from "./base-class.model";

export class RoleClass extends BaseClass {

    name?: string;
    value?: number;

    constructor(params: PropsPrototypes = {}) {
        super(params);
        this.name = params?.name;
        this.value = params?.value_order;
    }
}
