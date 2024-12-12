import { OPCClient } from "~app/feature/opcua-client/opcua-client.service";

const endpointUrl: string = 'opc.tcp://192.168.50.15:59100'
const nodeId: string = 'nsu=ChevronLD;s=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';

const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const opcuaClient: OPCClient = new OPCClient(endpointUrl, nodeId);
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
main();