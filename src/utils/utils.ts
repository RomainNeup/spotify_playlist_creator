export function getXRandom<T>(array: T[], x: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < x && i < array.length; i++) {
        let ran = Math.floor(Math.random() * array.length);
        if (!result.find(r => r === array[ran])) {
            result.push(array[ran]);
        } else {
            i--;
        }
    }

    return result;
}