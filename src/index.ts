import { OPCClient } from './feature/opcua-client/opcua-client.service';
import { OPCClientBasic } from './feature/opcua-client/opcua-client-basic.service';
import { DataType } from 'node-opcua';
import { Environment } from './environment';

const endpointUrl: string = Environment.opcuaServer.endpointUri;
const namespace: string = Environment.opcuaServer.namespace;
const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
const nodeId1: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.aLeakDetectedZone1';
const nodeId2: string = 's=ChevronLD.Model.Variable1';
//aLeakDetectedZone1

const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('creating client');
            const opcuaClient: OPCClient = new OPCClient(Environment.opcuaServer.endpointUri, namespace);
            await opcuaClient.ready;
            console.log('client created');
            const subscription$ = await opcuaClient.subscribe([nodeId, nodeId1, nodeId2]);
            subscription$.subscribe((dataValue: any) => {
                console.log('subscribed and got dataValue of', dataValue);
            });
            //const opcuaClient: OPCClientBasic = new OPCClientBasic(endpointUrl, namespace);
            //opcuaClient.readTag(nodeId);
            //opcuaClient.writeTag(nodeId, 10011, DataType.Int32);
            //opcuaClient.readTag(nodeId);
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