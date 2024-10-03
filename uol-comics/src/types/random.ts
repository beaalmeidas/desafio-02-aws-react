export function makeItRandom(a: number, b:number): number
{
    return parseFloat(((Math.random() * (b-a) + a)).toFixed(2))
}