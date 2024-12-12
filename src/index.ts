import { OPCClient } from './feature/opcua-client/opcua-client.service';
import { OPCClientBasic } from './feature/opcua-client/opcua-client-basic.service';
import { DataType } from 'node-opcua';

const endpointUrl: string = 'opc.tcp://192.168.50.15:59100';
const namespace: string = 'ChevronLD';
// const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
//const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.aLeakDetectedZone1';
const nodeId: string = 's=ChevronLD.Model.Variable1';
//aLeakDetectedZone1

const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('creating client');
            //const opcuaClient: OPCClient = new OPCClient(endpointUrl, namespace, nodeId);
            const opcuaClient: OPCClientBasic = new OPCClientBasic(endpointUrl, namespace);
            opcuaClient.readTag(nodeId);
            opcuaClient.writeTag(nodeId, 10011, DataType.Int32);
            opcuaClient.readTag(nodeId);
            // opcuaClient.writeTag(nodeId2, 10011, DataType.Float);
            // await opcuaClient.ready;
            // console.log('client ready');
            //await opcuaClient.browseWithClient();
            //const subscription = await opcuaClient.createSubscription();
            //console.log('subscription created!');
            // subscription.on('started', () =>
            //     console.log('subscription started - subscriptionId=',subscription.subscriptionId)
            // )
            // .on('keepalive', () => console.log('keepalive'))
            // .on('terminated', () => console.log('subscription terminated'));
            //await opcuaClient.browseAllNodes();
            //console.log('browse complete');
            //await opcuaClient.createSubscription();
            //await opcuaClient.writeTag();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
main();