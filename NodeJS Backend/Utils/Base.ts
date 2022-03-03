import {Logger} from "./Logger/logger"
export class Base{ 
    /* 🛠 Main class to extend from to have utilities such as logs 🛠*/
    logger:Logger
    constructor (log_path:string, num_lines_to_log:number){
        this.logger = new Logger(log_path, num_lines_to_log)
    }
    log(message:string, file_path:string = this.logger.log_path, num_lines_in_log:number = this.logger.num_lines_in_log)
    {
        this.logger.log(message, file_path, num_lines_in_log);
    }
}