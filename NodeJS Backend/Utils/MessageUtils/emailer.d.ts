export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
export declare type Users = {
    [key: string]: string;
};
export declare let ADMIN_LIST: string[];
export declare let USER_HASH: Users;
export declare function sendEmail(users: string[], message: string): void;
