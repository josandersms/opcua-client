export namespace Types {
    let BOOL: number;
    let SINT: number;
    let INT: number;
    let DINT: number;
    let LINT: number;
    let USINT: number;
    let UINT: number;
    let UDINT: number;
    let REAL: number;
    let LREAL: number;
    let STIME: number;
    let DATE: number;
    let TIME_AND_DAY: number;
    let DATE_AND_STRING: number;
    let STRING: number;
    let WORD: number;
    let DWORD: number;
    let BIT_STRING: number;
    let LWORD: number;
    let STRING2: number;
    let FTIME: number;
    let LTIME: number;
    let ITIME: number;
    let STRINGN: number;
    let SHORT_STRING: number;
    let TIME: number;
    let EPATH: number;
    let ENGUNIT: number;
    let STRINGI: number;
    let STRUCT: number;
}
/**
 * Checks if an Inputted Integer is a Valid Type Code (Vol1 Appendix C)
 *
 * @param {number} num - Integer to be Tested
 * @returns {boolean}
 */
export function isValidTypeCode(num: number): boolean;
/**
 * Retrieves Human Readable Version of an Inputted Type Code
 *
 * @param {number} num - Type Code to Request Human Readable version
 * @returns {string} Type Code String Interpretation
 */
export function getTypeCodeString(num: number): string;
