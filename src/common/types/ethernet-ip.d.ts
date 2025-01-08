declare module 'ethernet-ip' {
    import Queue from 'task-easy';

    export class Controller extends ENIP {
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
        get scanning(): boolean;
        /**
         * Gets the Controller Properties Object
         *
         * @readonly
         * @memberof Controller
         * @returns {object}
         */
        get properties(): object;
        /**
         * Fetches the last timestamp retrieved from the controller
         * in human readable form
         *
         * @readonly
         * @memberof Controller
         */
        get time(): any;
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
        writeTagGroup(group: TagGroup): Promise<any>;
        /**
         * Adds Tag to Subscription Group
         *
         * @param {Tagany} tag
         * @memberof Controller
         */
        subscribe(tag: Tag): void;
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

    // ENIP
        // CIP
    export namespace CIP {
        // CIP - DATA-TYPES
        export namespace DataTypes {
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
        }

        // CIP - EPATH
        export namespace EPATH {
            export namespace segments {
                export namespace SegmentTypes {
                    let PORT: number;
                    let LOGICAL: number;
                    let NETWORK: number;
                    let SYMBOLIC: number;
                    let DATA: number;
                    let DATATYPE_1: number;
                    let DATATYPE_2: number;
                }

                export namespace DATA {
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
                    export function build(data: string | Buffer, ANSI?: boolean | undefined): Buffer;
                }
            
                export namespace LOGICAL {
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
                    export function build(type: number, address: number, padded?: boolean | undefined): Buffer;
                    
                }

                export namespace PORT {
                    /**
                     * Builds Port Segement for EPATH
                     *
                     * @param {number} port - Port to leave Current Node (1 if Backplane)
                     * @param {number|string} link - link address to route packet
                     * @returns {buffer} EPATH Port Segment
                     */
                    export function build(port: number, link: number | string): Buffer;
                }
            }
        }

        // CIP - MESSAGE ROUTER
        export namespace MessageRouter {
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
        }

        // CIP - UNCONNECTED SEND
        export namespace UnconnectedSend {
            export type UCMMSendTimeout = {
                time_ticks: number;
                ticks: number;
            };
            /**
             * @typedef UCMMSendTimeout
             * @type {Object}
             * @property {number} time_ticks
             * @property {number} ticks
             */
            /**
             * Gets the Best Available Timeout Values
             *
             * @param {number} timeout - Desired Timeout in ms
             * @returns {UCMMSendTimeout}
             */
            export function generateEncodedTimeout(timeout: number): UCMMSendTimeout;
            /**
             * Builds an Unconnected Send Packet Buffer
             *
             * @param {buffer} message_request - Message Request Encoded Buffer
             * @param {buffer} path - Padded EPATH Buffer
             * @param {number} [timeout=2000] - timeout
             * @returns {buffer}
             */
            export function build(message_request: Buffer, path: Buffer, timeout?: number | undefined): Buffer;
        }
    }

    export namespace encapsulation {
        export type CommonPacketData = {
            /**
             * - Type of Item Encapsulated
             */
            TypeID: number;
            /**
             * - CIP Data Buffer
             */
            data: Buffer;
        };
        export type EncapsulationData = {
            /**
             * - Ecapsulation Command Code
             */
            commandCode: number;
            /**
             * - Encapsulation Command String Interpretation
             */
            command: string;
            /**
             * - Length of Encapsulated Data
             */
            length: number;
            /**
             * - Session ID
             */
            session: number;
            /**
             * - Status Code
             */
            statusCode: number;
            /**
             * - Status Code String Interpretation
             */
            status: string;
            /**
             * - Options (Typically 0x00)
             */
            options: number;
            /**
             * - Encapsulated Data Buffer
             */
            data: Buffer;
        };
        export namespace header {
            /**
             * Builds an ENIP Encapsolated Packet
             *
             * @param {number} cmd - Command to Send
             * @param {number} [session=0x00] - Session ID
             * @param {Buffer|Array} [data=[]] - Data to Send
             * @returns {Buffer} - Generated Buffer to be Sent to Target
             */
            function build(cmd: number, session?: number | undefined, data?: Buffer | any[]): Buffer;
            /**
             * Parses an Encapsulated Packet Received from ENIP Target
             *
             * @param {Buffer} buf - Incoming Encapsulated Buffer from Target
             * @returns {EncapsulationData} - Parsed Encapsulation Data Object
             */
            function parse(buf: Buffer): EncapsulationData;
        }
        export namespace CPF {
            namespace ItemIDs {
                let Null: number;
                let ListIdentity: number;
                let ConnectionBased: number;
                let ConnectedTransportPacket: number;
                let UCMM: number;
                let ListServices: number;
                let SockaddrO2T: number;
                let SockaddrT2O: number;
                let SequencedAddrItem: number;
            }
            /**
             * Checks if Command is a Valid Encapsulation Command
             *
             * @param {Number} ecapsulation command
             * @returns {boolean} test result
             */
            function isCmd(cmd: any): boolean;
            /**
             * Builds a Common Packet Formatted Buffer to be
             * Encapsulated.
             *
             * @param {Array} dataItems - Array of CPF Data Items
             * @returns {Buffer} CPF Buffer to be Encapsulated
             */
            function build(dataItems: any[]): Buffer;
            /**
             * Parses Incoming Common Packet Formatted Buffer
             * and returns an Array of Objects.
             *
             * @param {Buffer} buf - Common Packet Formatted Data Buffer
             * @returns {Array} Array of Common Packet Data Objects
             */
            function parse(buf: Buffer): any[];
        }
        /**
         * Checks if Command is a Valid Encapsulation Command
         *
         * @param {Number} ecapsulation command
         * @returns {boolean} test result
         */
        export function validateCommand(cmd: any): boolean;
        export namespace commands {
            export let NOP: number;
            export let ListServices: number;
            // export { ListServices_1 as ListServices };
            // let ListIdentity_1: number;
            export let ListIdentity: number;
            // export { ListIdentity_1 as ListIdentity };
            export let ListInterfaces: number;
            export let RegisterSession: number;
            export let UnregisterSession: number;
            export let SendRRData: number;
            export let SendUnitData: number;
            export let IndicateStatus: number;
            export let Cancel: number;
        }
        /**
         * Parses Encapulation Status Code to Human Readable Error Message.
         *
         * @param {number} status - Status Code
         * @returns {string} Human Readable Error Message
         */
        export function parseStatus(status: number): string;
        /**
         * Returns a Register Session Request String
         *
         * @returns {string} register session string
         */
        export function registerSession(): string;
        /**
         * Returns an Unregister Session Request String
         *
         * @param {number} session - Encapsulation Session ID
         * @returns {string} unregister seeion strings
         */
        export function unregisterSession(session: number): string;
        /**
         * Returns a UCMM Encapsulated Packet String
         *
         * @param {number} session - Encapsulation Session ID
         * @param {Buffer} data - Data to be Sent via UCMM
         * @param {number} [timeout=10] - Timeout (sec)
         * @returns {string} UCMM Encapsulated Message String
         */
        export function sendRRData(session: number, data: Buffer, timeout?: number | undefined): string;
        /**
         * Returns a Connected Message Datagram (Transport Class 3) String
         *
         * @param {number} session - Encapsulation Session ID
         * @param {Buffer} data - Data to be Sent via Connected Message
         * @param {number} ConnectionID - Connection ID from FWD_OPEN
         * @param {number} SequenceNumber - Sequence Number of Datagram
         * @returns {string} Connected Message Datagram String
         */
        export function sendUnitData(session: number, data: Buffer, ConnectionID: number, SequnceNumber: any): string;
        
    }

    /**
     * Low Level Ethernet/IP
     *
     * @class ENIP
     * @extends {Socket}
     * @fires ENIP#Session Registration Failed
     * @fires ENIP#Session Registered
     * @fires ENIP#Session Unregistered
     * @fires ENIP#SendRRData Received
     * @fires ENIP#SendUnitData Received
     * @fires ENIP#Unhandled Encapsulated Command Received
     */
    export class ENIP {
        state: {
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
        /**
         * Returns an Object
         *  - <number> error code
         *  - <string> human readable error
         *
         * @readonly
         * @memberof ENIP
         */
        get error(): {
            code: null;
            msg: null;
        };
        /**
         * Session Establishment In Progress
         *
         * @readonly
         * @memberof ENIP
         */
        get establishing(): boolean;
        /**
         * Session Established Successfully
         *
         * @readonly
         * @memberof ENIP
         */
        get established(): boolean;
        /**
         * Get ENIP Session ID
         *
         * @readonly
         * @memberof ENIP
         */
        get session_id(): null;
        /**
         * Initializes Session with Desired IP Address or FQDN
         * and Returns a Promise with the Established Session ID
         *
         * @override
         * @param {string} IP_ADDR - IPv4 Address (can also accept a FQDN, provided port forwarding is configured correctly.)
         * @returns {Promise}
         * @memberof ENIP
         */
        connect(IP_ADDR: string): Promise<any>;
        /**
         * Writes Ethernet/IP Data to Socket as an Unconnected Message
         * or a Transport Class 1 Datagram
         *
         * NOTE: Cant Override Socket Write due to net.Socket.write
         *        implementation. =[. Thus, I am spinning up a new Method to
         *        handle it. Dont Use Enip.write, use this function instead.
         *
         * @param {buffer} data - Data Buffer to be Encapsulated
         * @param {boolean} [connected=false]
         * @param {number} [timeout=10] - Timeoue (sec)
         * @param {function} [cb=null] - Callback to be Passed to Parent.Write()
         * @memberof ENIP
         */
        write_cip(data: Buffer, connected?: boolean | undefined, timeout?: number | undefined, cb?: Function | undefined): void;
        /**
         * Sends Unregister Session Command and Destroys Underlying TCP Socket
         *
         * @override
         * @param {Exception} exception - Gets passed to 'error' event handler
         * @memberof ENIP
         */
        destroy(exception: any): void;
        _initializeEventHandlers(): void;
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
         * Socket.on('data) Event Handler
         *
         * @param {Buffer} - Data Received from Socket.on('data', ...)
         * @memberof ENIP
         */
        _handleDataEvent(data: any): void;
        /**
         * Socket.on('close',...) Event Handler
         *
         * @param {Boolean} hadError
         * @memberof ENIP
         */
        _handleCloseEvent(hadError: boolean): void;
    }
    
    export class Tag {
        /**
         * Returns the total number of Tag Instances
         * that have been Created
         *
         * @readonly
         * @static
         * @returns {number} instances
         * @memberof Tag
         */
        static get instances(): number;
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
        get instance_id(): string;
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
        get timestamp(): string;
        /**
         * Gets Javascript Date Object of Timestamp
         *
         * @readonly
         * @memberof Tag
         * @returns {Date}
         */
        get timestamp_raw(): Date;
        /**
         * Gets Error
         *
         * @readonly
         * @memberof Tag
         * @returns {object|null} error
         */
        get error(): object | null;
        /**
         * Returns a Padded EPATH of Tag
         *
         * @readonly
         * @returns {buffer} Padded EPATH
         * @memberof Tag
         */
        get path(): Buffer;
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
        generateReadMessageRequest(size?: number | undefined): Buffer;
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
        generateWriteMessageRequest(value?: null, size?: number | undefined): Buffer;
        /**
         * Generates Write Tag Message For A Bit Index
         *
         * @param {number|boolean|object|string} value
         * @param {number} size
         * @returns {buffer} - Write Tag Message Service
         * @memberof Tag
         */
        generateWriteMessageRequestForBitIndex(value: number | boolean | object | string): Buffer;
        /**
         * Generates Write Tag Message For Atomic Types
         *
         * @param {number|boolean|object|string} value
         * @param {number} size
         * @returns {buffer} - Write Tag Message Service
         * @memberof Tag
         */
        generateWriteMessageRequestForAtomic(value: number | boolean | object | string, size: number): Buffer;
        /**
         * Unstages Value Edit by Updating controllerValue
         * after the Successful Completion of
         * a Tag Write
         *
         * @memberof Tag
         */
        unstageWriteRequest(): void;
    }
    
    export class TagGroup {
        state: {
            tags: {};
            path: any;
            timestamp: Date;
        };
        /**
         * Fetches the Number of Tags
         *
         * @readonly
         * @returns {number}
         * @memberof TagGroup
         */
        get length(): number;
        /**
         * Adds Tag to Group
         *
         * @param {Tag} tag - Tag to Add to Group
         * @memberof TagGroup
         */
        add(tag: Tag): void;
        /**
         * Removes Tag from Group
         *
         * @param {Tag} tag - Tag to be Removed from Group
         * @memberof TagGroup
         */
        remove(tag: Tag): void;
        /**
         * Iterable, Allows user to Iterate of each Tag in Group
         *
         * @param {function} callback - Accepts Tag Class
         * @memberof TagGroup
         */
        forEach(callback: Function): void;
        /**
         * Generates Array of Messages to Compile into a Multiple
         * Service Request
         *
         * @returns {Array} - Array of Read Tag Message Services
         * @memberof TagGroup
         */
        generateReadMessageRequests(): any[];
        /**
         * Parse Incoming Multi Service Request Messages
         *
         * @param {Array} responses
         * @param {Arrayany} ids
         * @memberof TagGroup
         */
        parseReadMessageResponses(responses: any[], ids: any[]): void;
        /**
         * Generates Array of Messages to Compile into a Multiple
         * Service Request
         *
         * @returns {Array} - Array of Read Tag Message Services
         * @memberof TagGroup
         */
        generateWriteMessageRequests(): any[];
        /**
         * Parse Incoming Multi Service Request Messages
         *
         * @param {Array} responses
         * @param {Arrayany} ids
         * @memberof TagGroup
         */
        parseWriteMessageRequests(responses: any[], ids: any[]): void;
    }
    
    export namespace util {
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
    }
}