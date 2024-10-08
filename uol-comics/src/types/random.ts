export function makeItRandom(a: number, b:number, isInt:boolean): string | number
{
    if(!isInt) 
        return ((Math.random() * (b-a) + a)).toFixed(2).replace('.', ',')
    
    return Math.floor((Math.random() * (b-a) + a))
}

export function forceIntMakeItRandom (a: number, b:number): number{
    return Math.floor((Math.random() * (b-a) + a))
}