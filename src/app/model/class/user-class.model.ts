import { PropsPrototypes } from 'ngx-api-sdk';
import { Privileges } from '../constant/privileges';
import { Roles } from '../constant/roles';
import { BaseClass } from './base-class.model';

export class UserClass extends BaseClass {

    username?: string;
    password?: string;
    full_name?: string;
    email?: string;
    roles_value?: number[];
    suffixes_avatar_url?: string;
    active_avatar_url?: string;
    display_avatar_url?: string;
    avatar_url_substitute?: string;
    role_name?: string;
    privileges?: Map<string, boolean>;
    attribute?: UserAttributes;
    self?: UserSelf;

    constructor(params: PropsPrototypes = {}) {
        super(params)
        this.username = params?.username;
        this.full_name = params?.fullname;
        this.email = params?.email;
        this.roles_value = params?.rolesOrder;
        this.suffixes_avatar_url = params?.suffixesAvatarUrl;
        this.active_avatar_url = params?.activeAvatarUrl;
        this.display_avatar_url = params?.displayAvatarUrl;
        this.role_name = params?.rolesName;
        this.privileges = params?.privileges;
        this.attribute = new UserAttributes(params);
        this.self = new UserSelf(params);
    }
}

export class UserSelf extends BaseClass {

    job_title?: string;
    department_name?: string;
    organization_name?: string;

    constructor(params: PropsPrototypes = {}) {
        super(params);
        this.job_title = 'Web Developer';
        this.department_name = 'No department';
        this.organization_name = 'No organization';
    }
}

export class UserAttributes extends BaseClass {

    display_background_url?: string;

    constructor(params: PropsPrototypes = {}) {
        super(params);
        this.display_background_url = '../../../../assets/images/profile/user-uploads/timeline.jpg';
    }
}

export const UserDefault: UserClass = {
    id: 0,
    username: '@viewer01',
    password: '12345678@',
    full_name: 'Viewer01',
    email: 'viewer01@gmail.com',
    role_name: Roles.ROLE_ANONYMOUS.toString(),
    roles_value: [2],
    privileges: new Map<string, boolean>([
        [Privileges.is_view.toString(), true]
    ]),
    display_avatar_url: '../../../../assets/images/portrait/small/avatar-s-27.png'
}
