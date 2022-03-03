import  * as nodemailer from 'nodemailer';
import {TransportOptions} from "nodemailer";

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
//Todo: make a user info class with nicknames and such.
export type Users = {
   [key:string]:string;
}
export let ADMIN_LIST = [
    "djdiamond2000@gmail.com",
    "cdiamond2002@gmail.com",
    "daylannance@gmail.com",
    "ddfalerts@gmail.com"
];

export let USER_HASH = <Users> {
    dj: "djdiamond2000@gmail.com",
    clay: "cdiamond2002@gmail.com",
    daylan: "daylannance@gmail.com"
}
export function sendEmail(users: string[], message:string)
{
    let transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: 'ddfalerts@gmail.com',
            pass: '3992Ncocoa'
        }
    });
    const user_str = users.join(',');
    let mailOptions = <MailOptions>{
        from: 'ddfalerts@gmail.com',
        to: user_str,
        subject: 'Hot Items with Uniswap V3 Info links',
        html: buildHTML(message)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) console.log('error');
        else console.log(`Email sent: ` + info.response);
    });
}
function getAdminEmails(): string{
    let return_str = "";
    return return_str;
}
function buildHTML(message:string):string {
 return `
    <html>
    <head>
    <style>:root{
      --black: #111111;
      --darkyellow: #ebab34;
    }
    
    html {background-color: #111111;}
    
    * {
      font-family: Helvetica;
      background: #111111;
      color: white;
    }
    .header {
      padding: 80px;
      text-align: center;
      background-color: #111111;
      color: white;
    }
    .header h1 {
      font-size: 40px;
    }
    div { padding: 20px;}
    p {
      color: lightgray;
      margin-left: 30px;
    }
    em { color: #ebab34 }
    a:link {
      color: #ebab34;
    }
    
    /* visited link */
    a:visited {
      color: darkolivegreen;
    }
    
    /* mouse over link */
    a:hover {
      color: #ebab34;
    }
    
    /* selected link */
    a:active {
      color: #ebab34;
    }
    </style>
    </head>
    <div>
    ${message}
    </div>
    </html>
`
}

