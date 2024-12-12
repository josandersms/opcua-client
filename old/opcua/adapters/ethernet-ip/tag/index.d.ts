declare class Tag {
    /**
     * Returns the total number of Tag Instances
     * that have been Created
     *
     * @readonly
     * @static
     * @returns {number} instances
     * @memberof Tag
     */
    static readonly get instances(): number;
    /**
     * Determines if a Tagname is Valid
     *
     * @static
     * @param {string} tagname
     * @returns {boolean}
     * @memberof Tag
     */
    static isValidTagname(tagname: string): boolean;
    constructor(tagname: any, program?: null, datatype?: null, keepAlive?: number);
    state: {
        tag: {
            name: any;
            type: null;
            bitIndex: number | null;
            value: null;
            controllerValue: null;
            path: any;
            program: null;
            stage_write: boolean;
        };
        read_size: number;
        error: {
            code: null;
            status: null;
        };
        timestamp: Date;
        instance: string;
        keepAlive: number;
    };
    /**
     * Returns the Tag Instance ID
     *
     * @readonly
     * @returns {string} Instance ID
     * @memberof Tag
     */
    readonly get instance_id(): string;
    /**
     * Sets Tagname if Valid
     *
     * @memberof Tag
     * @property {string} New Tag Name
     */
    set name(name: string);
    /**
     * Gets Tagname
     *
     * @memberof Tag
     * @returns {string} tagname
     */
    get name(): string;
    /**
     * Sets Tag Datatype if Valid
     *
     * @memberof Tag
     * @property {number} Valid Datatype Code
     */
    set type(type: string);
    /**
     * Gets Tag Datatype
     *
     * @memberof Tag
     * @returns {string} datatype
     */
    get type(): string;
    /**
     * Gets Tag Bit Index
     * - Returns null if no bit index has been assigned
     *
     * @memberof Tag
     * @returns {number} bitIndex
     */
    get bitIndex(): number;
    /**
     * Sets Tag Read Size
     *
     * @memberof Tag
     * @property {number} read size
     */
    set read_size(size: number);
    /**
     * Gets Tag Read Size
     *
     * @memberof Tag
     * @returns {number} read size
     */
    get read_size(): number;
    /**
     * Sets Tag Value
     *
     * @memberof Tag
     * @property {number|string|boolean|object} new value
     */
    set value(newValue: string | number | boolean | object);
    /**
     * Gets Tag value
     * - Returns null if no value has been read
     *
     * @memberof Tag
     * @returns {number|string|boolean|object} value
     */
    get value(): string | number | boolean | object;
    /**
     * Sets Controller Tag Value and Emits Changed Event
     *
     * @memberof Tag
     * @property {number|string|boolean|object} new value
     */
    set controller_value(newValue: string | number | boolean | object);
    /**
     * Sets Controller Tag Value and Emits Changed Event
     *
     * @memberof Tag
     * @returns {number|string|boolean|object} new value
     */
    get controller_value(): string | number | boolean | object;
    /**
     * Gets Timestamp in a Human Readable Format
     *
     * @readonly
     * @memberof Tag
     * @returns {string}
     */
    readonly get timestamp(): string;
    /**
     * Gets Javascript Date Object of Timestamp
     *
     * @readonly
     * @memberof Tag
     * @returns {Date}
     */
    readonly get timestamp_raw(): Date;
    /**
     * Gets Error
     *
     * @readonly
     * @memberof Tag
     * @returns {object|null} error
     */
    readonly get error(): object | null;
    /**
     * Returns a Padded EPATH of Tag
     *
     * @readonly
     * @returns {buffer} Padded EPATH
     * @memberof Tag
     */
    readonly get path(): buffer;
    /**
     * Returns a whether or not a write is staging
     *
     * @returns {boolean}
     * @memberof Tag
     */
    get write_ready(): boolean;
    /**
     * Generates Read Tag Message
     *
     * @param {number} [size=null]
     * @returns {buffer} - Read Tag Message Service
     * @memberof Tag
     */
    generateReadMessageRequest(size?: number | undefined): buffer;
    /**
     *  Parses Good Read Request Messages
     *
     * @param {buffer} Data Returned from Successful Read Tag Request
     * @memberof Tag
     */
    parseReadMessageResponse(data: any): void;
    /**
     *  Parses Good Read Request Messages Using A Mask For A Specified Bit Index
     *
     * @param {buffer} Data Returned from Successful Read Tag Request
     * @memberof Tag
     */
    parseReadMessageResponseValueForBitIndex(data: any): void;
    /**
     *  Parses Good Read Request Messages For Atomic Data Types
     *
     * @param {buffer} Data Returned from Successful Read Tag Request
     * @memberof Tag
     */
    parseReadMessageResponseValueForAtomic(data: any): void;
    /**
     * Generates Write Tag Message
     *
     * @param {number|boolean|object|string} [newValue=null] - If Omitted, Tag.value will be used
     * @param {number} [size=0x01]
     * @returns {buffer} - Write Tag Message Service
     * @memberof Tag
     */
    generateWriteMessageRequest(value?: null, size?: number | undefined): buffer;
    /**
     * Generates Write Tag Message For A Bit Index
     *
     * @param {number|boolean|object|string} value
     * @param {number} size
     * @returns {buffer} - Write Tag Message Service
     * @memberof Tag
     */
    generateWriteMessageRequestForBitIndex(value: number | boolean | object | string): buffer;
    /**
     * Generates Write Tag Message For Atomic Types
     *
     * @param {number|boolean|object|string} value
     * @param {number} size
     * @returns {buffer} - Write Tag Message Service
     * @memberof Tag
     */
    generateWriteMessageRequestForAtomic(value: number | boolean | object | string, size: number): buffer;
    /**
     * Unstages Value Edit by Updating controllerValue
     * after the Successful Completion of
     * a Tag Write
     *
     * @memberof Tag
     */
    unstageWriteRequest(): void;
}

export { Tag };