import { exec } from "child_process";
import fs from "fs"
import process from "process"
import moment from "moment-timezone";


export class Logger {
    log_path:string
    num_lines_in_log:number
    constructor(log_path:string, num_lines_in_log:number){
        this.log_path = log_path
        this.num_lines_in_log = num_lines_in_log
    }
    log(message:string, file_path:string = this.log_path, trim_length:number = 100){
        ////await this.myConsole.log(message);
        ////fs.appendFile('./filestream.log', message + '\n', function (err) {
        ////if (err) throw err;
        ////    console.log('Saved!');
        ////  });
        ////let stats = fs.stat("./filestream.log",()=>{})
        if(!fs.existsSync(file_path)) {
            fs.writeFileSync(file_path, '🦬 Initialized Temp Log');
        }
        let timestamp = moment(new Date());
        let time:string = timestamp.tz('America/New_York').format('MM/DD hh:mm:ssa');
        this.cmd(`gsed -i '1 i 🍁 ${time} 🍁 ${message}' ${file_path}`) 
        this.cmd(`gsed -i '${this.num_lines_in_log}, $d' ${file_path}`)
    }
    cmd(command:string)
    {
        exec(command, (error:any, stdout:any, stderr:any) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
         });
    }
}