export namespace types {
    let ClassID: number;
    let InstanceID: number;
    let MemberID: number;
    let ConnPoint: number;
    let AttributeID: number;
    let Special: number;
    let ServiceID: number;
}
/**
 * Builds Single Logical Segment Buffer
 *
 * @param {number} type - Valid Logical Segment Type
 * @param {number} address - Logical Segment Address
 * @param {boolean} [padded=true] - Padded or Packed EPATH format
 * @returns {buffer}
 */
export function build(type: number, address: number, padded?: boolean | undefined): buffer;
