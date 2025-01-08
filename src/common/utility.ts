/**
 * 
 * Asyncronously iterate over an array
 * @example
 * const array: number[] = [1,2,3];
 * console.log(`This is just the beginning!`);
 * await asyncForEach(array, (element: number) => {
 *  console.log(`Iterating ${element}`);
 * });
 * console.log(`Done!`);
 * @param {Array.<any>} input - The input array in which to iterate over.
 * @param {any} next - The callback function to execute on each array element.
 * @returns {Promise<void>} Thenable/Awaitable void return
 */
export const asyncForEach = async (input: any[], next: any): Promise<void> => {
    for (let i = 0;i < input.length;i++) {
        await next(input[i], i, input);
    }
}

export const checkTrue = (input: string): boolean => {
    return /^true$/i.test(input);
}