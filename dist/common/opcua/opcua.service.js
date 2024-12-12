"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcUaService = void 0;
const environments_1 = require("~app/environments");
const _1 = require(".");
const node_opcua_1 = require("node-opcua");
const utility_1 = require("~app/common/utility");
const configuration_1 = require("~app/common/configuration");
const allen_bradley_adapter_1 = require("./adapters/allen-bradley.adapter");
class OpcUaService {
    addressSpace = null;
    adapters = new Map();
    devices = new Map();
    plcs = new Map();
    namespace;
    ready;
    server = new node_opcua_1.OPCUAServer({
        port: environments_1.Environment.server.port,
        resourcePath: '',
        buildInfo: {
            productName: 'Microsoft Industrial AI Acceleration Studio - OPC UA Server',
            buildNumber: '1',
            buildDate: new Date(2024, 8, 9)
        }
    });
    constructor() {
        this.ready = new Promise(async (resolve, reject) => {
            try {
                await this.startServer();
                await this.processPLCs(await this.getPLCsFromConfiguration());
                resolve(undefined);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async addPLC(name, configuration) {
        return new Promise(async (resolve, reject) => {
            try {
                this.plcs.set(name, configuration);
                resolve(this.plcs.get(name));
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async addTags(plcName) {
        return new Promise(async (resolve, reject) => {
            try {
                const adapter = this.plcs.get(plcName).adapter;
                const tags = this.plcs.get(plcName)?.tagMapping;
                if (tags) {
                    await (0, utility_1.asyncForEach)(tags, async (tag) => {
                        await this.addVariable(plcName, tag.name, tag.dataType, {
                            get: () => new node_opcua_1.Variant({ dataType: tag.dataType, value: this.getRealValue(plcName, tag.name) })
                        }, tag.node);
                        await adapter.addTagSubscription(tag.name);
                    });
                    await adapter.subscribeTags();
                }
                else {
                    throw new Error(`No tags defined on PLC ${plcName}`);
                }
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async addVariable(deviceName, name, dataType, value, nodeId = undefined, minimumSamplingInterval = 1000) {
        return new Promise(async (resolve, reject) => {
            try {
                const device = this.plcs.get(deviceName)?.device;
                device?.variables.set(name, new _1.DeviceVariable(this.namespace.addVariable({
                    componentOf: device.device,
                    minimumSamplingInterval: minimumSamplingInterval,
                    [nodeId ? 'nodeid' : '']: nodeId,
                    browseName: name,
                    dataType: dataType,
                    value: value
                })));
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async connectPLC(plc) {
        return new Promise(async (resolve, reject) => {
            try {
                const plcInstance = this.plcs.get(plc);
                console.log(`Attempting to connect to PLC ${plcInstance.name} at ${plcInstance.address}...`);
                await this.plcs.get(plc).adapter.connect(plcInstance.address, plcInstance.slot, plcInstance.scanRate);
                console.log('Connected to PLC', plcInstance.name, 'at', plcInstance.address);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async createDevice(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const device = new _1.Device(this.namespace.addObject({
                    organizedBy: this.addressSpace?.rootFolder.objects,
                    browseName: name
                }));
                resolve(device);
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async getDevice(name) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.devices.has(name)) {
                    resolve(this.devices.get(name));
                }
                else {
                    throw new Error('Device not found');
                }
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async getPLCsFromConfiguration() {
        return new Promise(async (resolve, reject) => {
            try {
                const configuration = configuration_1.ConfigurationService.instance;
                resolve(configuration.queryConfiguration('$.plcs')[0]);
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async getPLC(name) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.plcs.has(name)) {
                    resolve(this.plcs.get(name));
                }
                else {
                    throw new Error('PLC not found');
                }
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    getRealValue(plc, tag) {
        console.log('=====>>>>> GETTING REAL VALUE', this.plcs.get(plc)?.device?.variables.get(tag)?.value);
        return true;
        return this.plcs.get(plc)?.device?.variables.get(tag)?.value;
    }
    async getUADevice(name) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.plcs.has(name)) {
                    resolve(this.plcs.get(name)?.device?.device);
                }
                else {
                    throw new Error('Device not found');
                }
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async processPLCs(plcs) {
        return new Promise(async (resolve, reject) => {
            try {
                await (0, utility_1.asyncForEach)(Array.from(plcs), async (plc) => {
                    try {
                        await this.addPLC(plc.name, plc);
                        this.plcs.get(plc.name).adapter = new allen_bradley_adapter_1.AllenBradleyAdapter();
                        this.plcs.get(plc.name).device = await this.createDevice(plc.name);
                        this.plcs.get(plc.name)?.adapter.events.subscribe((event) => {
                            if (event.message === 'Tag Initialized') {
                                console.log(`${event.message} for ${event.tag} with value: ${event.value}`);
                            }
                            else {
                                console.log(`Tag change detected for ${event.tag} with new value: ${event.value} changing from ${event.lastValue}`);
                            }
                            this.updateVariable(plc.name, event.tag, event.value);
                        });
                        await this.addTags(plc.name);
                        await this.connectPLC(plc.name);
                        await this.plcs.get(plc.name)?.adapter.start();
                    }
                    catch (plcError) {
                        console.error(`Could not connect to PLC ${plc.name}: ${plcError.message}`);
                    }
                });
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async updateVariable(plc, tag, value) {
        return new Promise(async (resolve, reject) => {
            try {
                this.plcs.get(plc).device.variables.get(tag).value = value;
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async startServer() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.server.initialize();
                this.addressSpace = this.server.engine.addressSpace;
                if (this.addressSpace === null)
                    throw new Error('AddressSpace is null');
                this.namespace = this.addressSpace.getOwnNamespace();
                await this.server.start();
                console.log('Microsoft Industrial AI Acceleration Studio - OPCUA Server is now listening at', this.server.endpoints[0].endpointDescriptions()[0].endpointUrl);
                console.log('press CTRL+C to stop');
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
}
exports.OpcUaService = OpcUaService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjdWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vb3BjdWEvb3BjdWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBZ0Q7QUFDaEQsd0JBQXNEO0FBQ3RELDJDQUE0SDtBQUU1SCxpREFBbUQ7QUFDbkQsNkRBQWlFO0FBRWpFLDRFQUF1RTtBQUV2RSxNQUFhLFlBQVk7SUFrQmIsWUFBWSxHQUF3QixJQUFJLENBQUM7SUFDMUMsUUFBUSxHQUFxQixJQUFJLEdBQUcsRUFBZSxDQUFDO0lBQ3BELE9BQU8sR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFDekQsSUFBSSxHQUFzQixJQUFJLEdBQUcsRUFBZ0IsQ0FBQztJQUNqRCxTQUFTLENBQWE7SUFDdkIsS0FBSyxDQUFlO0lBQ3BCLE1BQU0sR0FBZ0IsSUFBSSx3QkFBVyxDQUFDO1FBQ3pDLElBQUksRUFBRSwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1FBQzdCLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFNBQVMsRUFBRztZQUNSLFdBQVcsRUFBRSw2REFBNkQ7WUFDMUUsV0FBVyxFQUFFLEdBQUc7WUFDaEIsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0osQ0FBQyxDQUFDO0lBRUg7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6QixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO2dCQVE5RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLE9BQU8sS0FBSyxF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