import { PropsPrototypes } from 'ngx-api-sdk';
import { BaseClass } from './base-class.model';

export class AuthClass extends BaseClass {

    user_id?: number;
    roles_id?: number[];
    expired_at?: Date;
    privileges?: Map<string, boolean>;
    access_token?: string;

    constructor(props: PropsPrototypes = {}) {
        super(props);
        this.user_id = props?.userId;
        this.roles_id = props?.rolesId;
        this.expired_at = props?.expiresAt ? new Date(props.expiresAt) : null;
        this.privileges = props?.privileges;
        this.access_token = props?.accessToken;
    }
}
