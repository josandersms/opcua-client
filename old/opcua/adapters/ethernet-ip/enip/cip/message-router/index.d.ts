export type MessageRouter = {
    /**
     * - Reply Service Code
     */
    service: number;
    /**
     * - General Status Code (Vol 1 - Appendix B)
     */
    generalStatusCode: number;
    /**
     * - Length of Extended Status (In 16-bit Words)
     */
    extendedStatusLength: number;
    /**
     * - Extended Status
     */
    extendedStatus: any[];
    /**
     * - Status Code
     */
    data: Buffer;
};
/**
 * Builds a Message Router Request Buffer
 *
 * @param {number} service - CIP Service Code
 * @param {Buffer} path - CIP Padded EPATH (Vol 1 - Appendix C)
 * @param {Buffer} data - Service Specific Data to be Sent
 * @returns {Buffer} Message Router Request Buffer
 */
export function build(service: number, path: Buffer, data: Buffer): Buffer;
/**
 * @typedef MessageRouter
 * @type {Object}
 * @property {number} service - Reply Service Code
 * @property {number} generalStatusCode - General Status Code (Vol 1 - Appendix B)
 * @property {number} extendedStatusLength - Length of Extended Status (In 16-bit Words)
 * @property {Array} extendedStatus - Extended Status
 * @property {Buffer} data - Status Code
 */
/**
 * Parses a Message Router Request Buffer
 *
 * @param {Buffer} buf - Message Router Request Buffer
 * @returns {MessageRouter} Decoded Message Router Object
 */
export function parse(buf: Buffer): MessageRouter;
export namespace services {
    let GET_ATTRIBUTE_ALL: number;
    let GET_ATTRIBUTE_SINGLE: number;
    let RESET: number;
    let START: number;
    let STOP: number;
    let CREATE: number;
    let DELETE: number;
    let MULTIPLE_SERVICE_PACKET: number;
    let APPLY_ATTRIBUTES: number;
    let SET_ATTRIBUTE_SINGLE: number;
    let FIND_NEXT: number;
    let READ_TAG: number;
    let WRITE_TAG: number;
    let READ_TAG_FRAGMENTED: number;
    let WRITE_TAG_FRAGMENTED: number;
    let READ_MODIFY_WRITE_TAG: number;
}
