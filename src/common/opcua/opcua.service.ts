import { Environment } from '~app/environments';
import { Device, DeviceVariable, IPLC, Tag } from '.';
import { AddressSpace, DataType, ISessionContext, Namespace, OPCUAServer, StatusCodes, UAObject, Variant} from 'node-opcua';
import { availableMemory } from '~app/common/helpers';
import { asyncForEach } from '~app/common/utility';
import { ConfigurationService } from '~app/common/configuration';
import { IOpcUaTagEvent } from './adapters';
import { AllenBradleyAdapter } from './adapters/allen-bradley.adapter';

export class OpcUaService {

    /**
     * 
     * A DEVICE is the OPCUA server's representation of the PLC
     * An ADAPTER is the actual connection to the PLC
     * A PLC is the definition of the configuration, the DEVICE, and the ADAPTER
     * Therefore, a DEVICE exposes the ADAPTER which is defined by the PLC
     * 1.  Start this actual OPCUA server
     * 2.  Get PLC configuration from ConfigurationService
     * 3.  Add each PLC to this.plcs
     * 4.  Load the adapter associated and add to this.plcs instance
     * 5.  Create a new device to match the adapter and add to this.plcs instance
     * 6.  Add the tags for the adapter and subscribe
     * 7.  Connect/start the adapter
     * 
     */

    private addressSpace: AddressSpace | null = null;
    public adapters: Map<string, any> = new Map<string, any>();
    public devices: Map<string, Device> = new Map<string, Device>();
    public plcs: Map<string, IPLC> = new Map<string, IPLC>();
    private namespace!: Namespace;
    public ready: Promise<any>;
    public server: OPCUAServer = new OPCUAServer({
        port: Environment.server.port,
        resourcePath: '',
        buildInfo : {
            productName: 'Microsoft Industrial AI Acceleration Studio - OPC UA Server',
            buildNumber: '1',
            buildDate: new Date(2024,8,9)
        }
    }); 

    constructor() {
        this.ready = new Promise(async (resolve, reject) => {
            try {              
                await this.startServer();
                await this.processPLCs(await this.getPLCsFromConfiguration());

               // this.plcs.get('Demo PLC')?.device?.device.addListener('event', (e:any) => console.log('event changed on listener for ', e));
            // ).forEach((variable) => {
            //         variable.value$.subscribe((value) => {
            //             console.log('VARIABLE', variable.variable.browseName, 'changed to', value);
            //         });
            //     });
                resolve(undefined);
            } catch (error) {
                reject(error as Error);
            }
        });

    }

    public async addPLC(name: string, configuration: IPLC): Promise<IPLC> {
        return new Promise(async (resolve, reject) => {
            try {
                this.plcs.set(name, configuration);
                resolve(this.plcs.get(name) as IPLC);
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async addTags(plcName: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const adapter = this.plcs.get(plcName)!.adapter;
                const tags: Tag[] | undefined = this.plcs.get(plcName)?.tagMapping;
                if (tags) {
                    await asyncForEach(tags, async (tag: Tag) => {
                        await this.addVariable(plcName, tag.name, tag.dataType, {
                            get: () => new Variant( { dataType: tag.dataType, value: this.getRealValue(plcName, tag.name) })
                        }
                        , tag.node);
                        await adapter.addTagSubscription(tag.name);
                    });

                    // Subscribe to the tags we have added to the subscription above.
                    await adapter.subscribeTags();
                } else {
                    // If there are no tag mappings, throw an error stating such.
                    throw new Error(`No tags defined on PLC ${plcName}`);
                }
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async addVariable(deviceName: string, name: string, dataType: DataType, value: any, nodeId: string | undefined = undefined, minimumSamplingInterval: number = 1000): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const device = this.plcs.get(deviceName)?.device;
                // const device: Device = await this.getDevice(deviceName);
                device?.variables.set(name, new DeviceVariable(this.namespace.addVariable({
                    componentOf: device.device,
                    minimumSamplingInterval: minimumSamplingInterval,
                    [nodeId ? 'nodeid' : '']: nodeId as string,
                    browseName: name,
                    dataType: dataType,
                    value: value
                })));
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async connectPLC(plc: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const plcInstance = this.plcs.get(plc) as IPLC;
                
                // ASSUMING ONLY ALLEN BRADLEY PLCs FOR NOW
                console.log(`Attempting to connect to PLC ${plcInstance.name} at ${plcInstance.address}...`);
                
                await this.plcs.get(plc)!.adapter.connect(plcInstance.address, plcInstance.slot, plcInstance.scanRate);
                console.log('Connected to PLC', plcInstance.name, 'at', plcInstance.address);
                resolve();
            } catch (error: any) {
                reject(error as Error);
            }
        });
    }

    public async createDevice(name: string): Promise<Device> {
        return new Promise(async (resolve, reject) => {
            try {
                const device: Device = new Device(this.namespace.addObject({
                    organizedBy: this.addressSpace?.rootFolder.objects,
                    browseName: name
                }));
                resolve(device);
            } catch (error: any) {
                reject(new Error(error));
            }
        });
        
    }

    public async getDevice(name: string): Promise<Device> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.devices.has(name)) {
                    resolve(this.devices.get(name) as Device);
                } else {
                    throw new Error('Device not found');
                }
            } catch (error: any) {
                reject(new Error(error));
            }
        });
        
    }

    private async getPLCsFromConfiguration(): Promise<IPLC[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const configuration: any = ConfigurationService.instance;
                resolve(configuration.queryConfiguration('$.plcs')[0]);
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async getPLC(name: string): Promise<IPLC> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.plcs.has(name)) {
                    resolve(this.plcs.get(name) as IPLC);
                } else {
                    throw new Error('PLC not found');
                }
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public getRealValue<T>(plc: string, tag: string): T {
        console.log('=====>>>>> GETTING REAL VALUE', this.plcs.get(plc)?.device?.variables.get(tag)?.value as T);
        return true as T;
        return this.plcs.get(plc)?.device?.variables.get(tag)?.value as T;
    }

    public async getUADevice(name: string): Promise<UAObject> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.plcs.has(name)) {
                    resolve(this.plcs.get(name)?.device?.device as UAObject);
                } else {
                    throw new Error('Device not found');
                }
            } catch (error: any) {
                reject(new Error(error));
            }
        });
        
    }

    // Step 3 - 7
    private async processPLCs(plcs: IPLC[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await asyncForEach(Array.from(plcs), async (plc: IPLC) => {
                    try {
                        await this.addPLC(plc.name, plc); // Step 3
                        this.plcs.get(plc.name)!.adapter = new AllenBradleyAdapter(); // Step 4
                        this.plcs.get(plc.name)!.device = await this.createDevice(plc.name); // Step 5
                        this.plcs.get(plc.name)?.adapter.events.subscribe((event: IOpcUaTagEvent) => {
                            if (event.message === 'Tag Initialized') {
                                console.log(`${event.message} for ${event.tag} with value: ${event.value}`);
                                
                            } else {
                                console.log(`Tag change detected for ${event.tag} with new value: ${event.value} changing from ${event.lastValue}`);
                            }
                            this.updateVariable(plc.name, event.tag, event.value);
                        });         
                        await this.addTags(plc.name); // Step 6
                        await this.connectPLC(plc.name); // Step 7   
                        await this.plcs.get(plc.name)?.adapter.start();
                             
                    } catch (plcError) {
                        console.error(`Could not connect to PLC ${plc.name}: ${(plcError as Error).message}`);
                    }
                });
                resolve();
            } catch (error: any) {
                reject(error as Error);
            }
        });
    }

    private async updateVariable(plc: string, tag: string, value: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.plcs.get(plc)!.device!.variables.get(tag)!.value = value;
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    // Step 1
    private async startServer(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.server.initialize();

                this.addressSpace = this.server.engine.addressSpace;
                if (this.addressSpace === null) throw new Error('AddressSpace is null');

                this.namespace = this.addressSpace.getOwnNamespace();
                
                // await this.addVariable('MyDevice', 'Temperature', DataType.Double, {
                //     get: () => new Variant({ dataType: DataType.Double, value: 19.5 }),
                //     set: (variant: any) => {
                //         (device.variables.get('Temperature') as DeviceVariable).value = parseFloat(variant.value);
                //         return StatusCodes.Good;
                //     }
                // }, 'ns=1;b=1020FFAA', 1234,);


                await this.server.start(); // Step 1
                console.log('Microsoft Industrial AI Acceleration Studio - OPCUA Server is now listening at', this.server.endpoints[0].endpointDescriptions()[0].endpointUrl);
                console.log('press CTRL+C to stop');
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        })
    }
}
