export function print_json_tree(obj:any, filler:string, prefix:string = '',filler_multiplier:number = 0)
{
    for(let item in obj)
    {
        if(typeof obj[item] === "object")
        {
            print_json_tree(obj[item], filler, `${prefix}__${item}`, filler_multiplier + 1);
        }
        else console.log(`${filler.repeat(filler_multiplier)}${prefix}__${item}: ${obj[item]}`);
    }
}