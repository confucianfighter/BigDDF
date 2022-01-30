//make a string hash
let tokenHash:any = {}
tokenHash.eth = '12345';
console.log(tokenHash['eth']);
tokenHash['DAI'] = '4566DAI'
console.log(tokenHash['DAI']);

// make a keyed hash of a certain type:
type OnlyBoolsAndStrings = {
    [key: string]: boolean | string;
};
