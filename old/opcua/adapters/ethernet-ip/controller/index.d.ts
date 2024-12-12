import { ENIP } from '../enip';
import TagGroup from '../tag-group';
import Queue from 'task-easy';

declare class Controller extends ENIP {
    constructor({ queue_max_size }?: {
        queue_max_size: any;
    });
    state: {
        controller: {
            name: null;
            serial_number: null;
            slot: null;
            time: null;
            path: null;
            version: null;
            status: null;
            faulted: boolean;
            minorRecoverableFault: boolean;
            minorUnrecoverableFault: boolean;
            majorRecoverableFault: boolean;
            majorUnrecoverableFault: boolean;
            io_faulted: boolean;
        };
        subs: TagGroup;
        scanning: boolean;
        scan_rate: number;
        TCP: {
            establishing: boolean;
            established: boolean;
        };
        session: {
            id: null;
            establishing: boolean;
            established: boolean;
        };
        connection: {
            id: null;
            establishing: boolean;
            established: boolean;
            seq_num: number;
        };
        error: {
            code: null;
            msg: null;
        };
    };
    workers: {
        read: Queue<any>;
        write: Queue<any>;
        group: Queue<any>;
    };
    /**
     * Sets the Subsciption Group Scan Rate
     *
     * @memberof Controller
     */
    set scan_rate(rate: number);
    /**
     * Returns the Scan Rate of Subscription Tags
     *
     * @memberof Controller
     * @returns {number} ms
     */
    get scan_rate(): number;
    /**
     * Get the status of Scan Group
     *
     * @readonly
     * @memberof Controller
     */
    readonly get scanning(): boolean;
    /**
     * Gets the Controller Properties Object
     *
     * @readonly
     * @memberof Controller
     * @returns {object}
     */
    readonly get properties(): object;
    /**
     * Fetches the last timestamp retrieved from the controller
     * in human readable form
     *
     * @readonly
     * @memberof Controller
     */
    readonly get time(): any;
    /**
     * Initializes Session with Desired IP Address
     * and Returns a Promise with the Established Session ID
     *
     * @override
     * @param {string} IP_ADDR - IPv4 Address (can also accept a FQDN, provided port forwarding is configured correctly.)
     * @param {number} SLOT - Controller Slot Number (0 if CompactLogix)
     * @returns {Promise}
     * @memberof ENIP
     */
    override connect(IP_ADDR: string, SLOT?: number): Promise<any>;
    /**
     * Reads Controller Identity Object
     *
     * @memberof Controller
     * @returns {Promise}
     */
    readControllerProps(): Promise<any>;
    /**
     * Reads the Controller Wall Clock Object
     *
     * @memberof Controller
     * @returns {Promise}
     */
    readWallClock(): Promise<any>;
    /**
     * Write to PLC Wall Clock
     *
     * @param {Date} [date=new Date()]
     * @memberof Controller
     * @returns {Promise}
     */
    writeWallClock(date?: Date | undefined): Promise<any>;
    /**
     * Reads Value of Tag and Type from Controller
     *
     * @param {Tag} tag - Tag Object to Write
     * @param {number} [size=null]
     * @returns {Promise}
     * @memberof Controller
     */
    readTag(tag: Tag, size?: number | undefined): Promise<any>;
    /**
     * Writes value to Tag
     *
     * @param {Tag} tag - Tag Object to Write
     * @param {number|boolean|object|string} [value=null] - If Omitted, Tag.value will be used
     * @param {number} [size=0x01]
     * @returns {Promise}
     * @memberof Controller
     */
    writeTag(tag: Tag, value?: string | number | boolean | object | undefined, size?: number | undefined): Promise<any>;
    /**
     * Reads All Tags in the Passed Tag Group
     *
     * @param {TagGroup} group
     * @returns {Promise}
     * @memberof Controller
     */
    readTagGroup(group: TagGroup): Promise<any>;
    /**
     * Writes to Tag Group Tags
     *
     * @param {TAgGroup} group
     * @returns {Promise}
     * @memberof Controller
     */
    writeTagGroup(group: TAgGroup): Promise<any>;
    /**
     * Adds Tag to Subscription Group
     *
     * @param {Tagany} tag
     * @memberof Controller
     */
    subscribe(tag: Tagany): void;
    /**
     * Begin Scanning Subscription Group
     *
     * @memberof Controller
     */
    scan(): Promise<void>;
    /**
     * Pauses Scanning of Subscription Group
     *
     * @memberof Controller
     */
    pauseScan(): void;
    /**
     * Iterates of each tag in Subscription Group
     *
     * @param {function} callback
     * @memberof Controller
     */
    forEach(callback: Function): void;
    /**
     * Initialized Controller Specific Event Handlers
     *
     * @memberof Controller
     */
    _initializeControllerEventHandlers(): void;
    /**
     * Reads Value of Tag and Type from Controller
     *
     * @param {Tag} tag - Tag Object to Write
     * @param {number} [size=null]
     * @returns {Promise}
     * @memberof Controller
     */
    _readTag(tag: Tag, size?: number | undefined): Promise<any>;
    /**
     * Writes value to Tag
     *
     * @param {Tag} tag - Tag Object to Write
     * @param {number|boolean|object|string} [value=null] - If Omitted, Tag.value will be used
     * @param {number} [size=0x01]
     * @returns {Promise}
     * @memberof Controller
     */
    _writeTag(tag: Tag, value?: string | number | boolean | object | undefined, size?: number | undefined): Promise<any>;
    /**
     * Reads All Tags in the Passed Tag Group
     *
     * @param {TagGroup} group
     * @returns {Promise}
     * @memberof Controller
     */
    _readTagGroup(group: TagGroup): Promise<any>;
    /**
     * Writes to Tag Group Tags
     *
     * @param {TagGroup} group
     * @returns {Promise}
     * @memberof Controller
     */
    _writeTagGroup(group: TagGroup): Promise<any>;
    /**
     * @typedef EncapsulationData
     * @type {Object}
     * @property {number} commandCode - Ecapsulation Command Code
     * @property {string} command - Encapsulation Command String Interpretation
     * @property {number} length - Length of Encapsulated Data
     * @property {number} session - Session ID
     * @property {number} statusCode - Status Code
     * @property {string} status - Status Code String Interpretation
     * @property {number} options - Options (Typically 0x00)
     * @property {Buffer} data - Encapsulated Data Buffer
     */
    /*****************************************************************/
    /**
     * @typedef MessageRouter
     * @type {Object}
     * @property {number} service - Reply Service Code
     * @property {number} generalStatusCode - General Status Code (Vol 1 - Appendix B)
     * @property {number} extendedStatusLength - Length of Extended Status (In 16-bit Words)
     * @property {Array} extendedStatus - Extended Status
     * @property {Buffer} data - Status Code
     */
    /*****************************************************************/
    /**
     * Handles SendRRData Event Emmitted by Parent and Routes
     * incoming Message
     *
     * @param {Array} srrd - Array of Common Packet Formatted Objects
     * @memberof Controller
     */
    _handleSendRRDataReceived(srrd: any[]): void;
}

export { Controller };
