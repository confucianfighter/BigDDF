export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
export declare enum Users {
    daylan = "daylannance@gmail.com",
    clay = "cdiamond2002@gmail.com"
}
export declare function sendEmail(to: Users, message: string): void;
