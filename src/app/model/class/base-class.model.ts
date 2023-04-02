import { PropsPrototypes } from 'ngx-api-sdk';

export class BaseClass {

    id?: any;
    _id?: any;
    __v?: any;
    created_at?: Date;
    created_by?: number;
    modified_at?: Date;
    modified_by?: number;
    description?: string;
    deleted?: boolean;
    archived?: boolean;
    is_protected?: boolean;

    constructor(params: PropsPrototypes = {}) {
        this.id = params?.id;
        this._id = params?._id;
        this.__v = params?.__v;
        this.created_at = params?.createdTime;
        this.created_by = params?.createdBy;
        this.modified_at = params?.modifiedTime;
        this.modified_by = params?.modifiedBy;
        this.description = params?.description;
        this.deleted = params?.deleted;
        this.archived = params?.archived;
        this.is_protected = params?.hasProtected;
    }
}
