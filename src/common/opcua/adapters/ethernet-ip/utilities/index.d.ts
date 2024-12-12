/**
 * Wraps a Promise with a Timeout
 *
 * @param {Promise} - promise to complete before the timeout
 * @param {number} - Timeout Length (ms)
 * @param {Error|string} - Error to Emit if Timeout Occurs
 * @returns {Promise}
 * @memberof Controller
 */
export function promiseTimeout(promise: any, ms: any, error?: Error): Promise<any>;
/**
 * Delays X ms
 *
 * @param {number} ms - Delay Length (ms)
 * @returns {Promise}
 */
export function delay(ms: number): Promise<any>;
