"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.USER_HASH = exports.ADMIN_LIST = void 0;
var nodemailer = __importStar(require("nodemailer"));
exports.ADMIN_LIST = [
    "djdiamond2000@gmail.com",
    "cdiamond2002@gmail.com",
    "daylannance@gmail.com",
    "ddfalerts@gmail.com"
];
exports.USER_HASH = {
    dj: "djdiamond2000@gmail.com",
    clay: "cdiamond2002@gmail.com",
    daylan: "daylannance@gmail.com"
};
function sendEmail(users, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ddfalerts@gmail.com',
            pass: '3992Ncocoa'
        }
    });
    var user_str = users.join(',');
    var mailOptions = {
        from: 'ddfalerts@gmail.com',
        to: user_str,
        subject: 'Hot Items with Uniswap V3 Info links',
        html: buildHTML(message)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.log('error');
        else
            console.log("Email sent: " + info.response);
    });
}
exports.sendEmail = sendEmail;
function getAdminEmails() {
    var return_str = "";
    return return_str;
}
function buildHTML(message) {
    return "\n    <html>\n    <head>\n    <style>:root{\n      --black: #111111;\n      --darkyellow: #ebab34;\n    }\n    \n    html {background-color: #111111;}\n    \n    * {\n      font-family: Helvetica;\n      background: #111111;\n      color: white;\n    }\n    .header {\n      padding: 80px;\n      text-align: center;\n      background-color: #111111;\n      color: white;\n    }\n    .header h1 {\n      font-size: 40px;\n    }\n    div { padding: 20px;}\n    p {\n      color: lightgray;\n      margin-left: 30px;\n    }\n    em { color: #ebab34 }\n    a:link {\n      color: #ebab34;\n    }\n    \n    /* visited link */\n    a:visited {\n      color: darkolivegreen;\n    }\n    \n    /* mouse over link */\n    a:hover {\n      color: #ebab34;\n    }\n    \n    /* selected link */\n    a:active {\n      color: #ebab34;\n    }\n    </style>\n    </head>\n    <div>\n    ".concat(message, "\n    </div>\n    </html>\n");
}
//# sourceMappingURL=emailer.js.map