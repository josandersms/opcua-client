import { OPCClient } from './feature/opcua-client/opcua-client.service';
import { MqttService } from './common/mqtt';
import { Environment } from './environment';

const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
const nodeId1: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.aLeakDetectedZone1';
const nodeId3: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.BS01_Bypass_SolVlv_Output';
const nodeId2: string = 's=ChevronLD.Model.Variable1';
const nodeId4: string = 's=ChevronLD.L320ER.aiokepwaretest';
//ns=2;s=Rockwell.1756-L85E/B.FluidDemoTags.cmd_Pump1_Enable
const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const mqttService: MqttService = new MqttService(Environment.mqttBroker.uri);
            mqttService.status.subscribe((status: string) => {
                console.log('MQTT Service Status is now ==>', status);
            });
            mqttService.subscriptions$.subscribe((mqmessage) => {
                console.log('MQTT Service Subscription received ==>', mqmessage);
            });
            await mqttService.ready;
            mqttService.subscribeTopic('azedge/dmqtt/selftest/#')
            console.log('Creating Client...');
            const opcuaClient: OPCClient = new OPCClient(Environment.opcuaServer.endpointUri, Environment.opcuaServer.namespace);
            await opcuaClient.ready;
            console.log('Client Created');
            opcuaClient.subscription$.subscribe((message: any) => {
                switch(message['action']) {
                    case 'changed': 
                        console.log('Value Changed', message['value']);
                        break;
                    case 'created': 
                        console.log('Subscription Created');
                        break;
                    case 'keepalive': 
                        console.log('Subscription Keepalive');
                        break;
                    case 'terminated': 
                        console.log('Subscription Terminated');
                        break;
                }
            });
            //await opcuaClient.subscribe([nodeId, nodeId1, nodeId2, nodeId3]);
            await opcuaClient.subscribe([nodeId4]);
            console.log('NAMESPACES ARE==>', await opcuaClient.getNamespaces());

            console.log('DIRECT READ IS: ', await opcuaClient.readValue(nodeId4));
            //opcuaClient.writeTag(nodeId, 10011, DataType.Int32);
            //opcuaClient.readTag(nodeId);
            // opcuaClient.writeTag(nodeId2, 10011, DataType.Float);
            //await opcuaClient.browseWithClient();
            //await opcuaClient.browseAllNodes();
            //console.log('browse complete');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
main();