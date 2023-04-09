import { PropsPrototypes } from "ngx-api-sdk";
import { BaseClass } from "./base-class.model";

export class ResumeClass extends BaseClass {
    summary?: ResumeSummary;

    constructor(params: PropsPrototypes = {}) {
        super(params)
        this.summary = new ResumeSummary(params?.summary);
    }
}

export class ResumeSummary {
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