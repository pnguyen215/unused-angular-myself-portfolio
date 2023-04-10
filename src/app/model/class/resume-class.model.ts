import { PropsPrototypes } from "ngx-api-sdk";
import { BaseClass } from "./base-class.model";

export class ResumeClass extends BaseClass {
    contact?: ResumeContact;
    info?: ResumeInfo;

    constructor(params: PropsPrototypes = {}) {
        super(params)
        this.contact = new ResumeContact(params?.contact);
        this.info = new ResumeInfo(params?.info);
    }
}

export class ResumeContact {
    link_github?: string;
    link_linkedin?: string;
    account_email: string;
    work_phone?: string;

    constructor(params: PropsPrototypes = {}) {
        this.link_github = params?.link_github;
        this.link_linkedin = params?.link_linkedin;
        this.account_email = params?.account_email;
        this.work_phone = params?.work_phone;
    }
}

export class ResumeInfo {
    full_name?: string;
    nickname?: string;
    job_role?: string;

    constructor(params: PropsPrototypes = {}) {
        this.full_name = params?.full_name;
        this.nickname = params?.nickname;
        this.job_role = params?.job_role;
    }
} 