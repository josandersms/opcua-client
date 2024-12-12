export namespace Types {
    let Simple: number;
    let ANSI_EXTD: number;
}
/**
 * Builds EPATH Data Segment
 *
 * @param {string|buffer} data
 * @param {boolean} [ANSI=true] Declare if ANSI Extended or Simple
 * @returns {buffer}
 */
export function build(data: string | buffer, ANSI?: boolean | undefined): buffer;
