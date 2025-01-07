import { OPCClient } from './feature/opcua-client/opcua-client.service';
import { MqttService } from './common/mqtt';
import { Environment } from './environment';
import { DataType } from 'node-opcua';
import { filter } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';
import { command } from './common/types/command.type';

//const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
//const nodeId1: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.aLeakDetectedZone1';
//const nodeId3: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.BS01_Bypass_SolVlv_Output';
const nodeId2: string = 's=ChevronLDTest.Model.Variable1';
const nodeId4: string = 's=ChevronLDTest.Model.Object1.VariableA';
const nodeToWrite: string = 's=ChevronLDTest.MethodInvocation1';
//const nodeId4: string = 's=ChevronLD.L320ER.aiokepwaretest';
//ns=2;s=Rockwell.1756-L85E/B.FluidDemoTags.cmd_Pump1_Enable

const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const opcuaClient: OPCClient = new OPCClient(Environment.opcuaServer.endpointUri, Environment.opcuaServer!.namespace!);
            await opcuaClient.ready;
            console.log('OPC-UA Client Created');
            opcuaClient.subscription$.subscribe((message: any) => {
                switch(message['action']) {
                    case 'changed': 
                        console.log('OPC-UA Value Changed', message['value']);
                        break;
                    case 'created': 
                        console.log('OPC-UA Subscription Created');
                        break;
                    case 'keepalive': 
                        // console.log('OPC-UA Subscription Keepalive');
                        break;
                    case 'terminated': 
                        console.log('OPC-UA Subscription Terminated');
                        break;
                }
            });
            await opcuaClient.subscribe([nodeId2, nodeId4]);


            const mqttService: MqttService = new MqttService(Environment.mqttBroker!.uri!);
            mqttService.subscriptions$.subscribe((m) => console.log('received message', m));
            mqttService.subscriptions$.pipe(filter(mqmessage => mqmessage.topic === Environment.mqttBroker?.southboundTopic)).subscribe(async (mqmessage) => {
                const message: command = JSON.parse(mqmessage.value);
                const dataTypeKey: keyof typeof DataType = message.dataType;
                const result = await opcuaClient.writeTag(message.node, message.value, DataType[dataTypeKey]);
                console.log('write tag result is', result);
            });
            await mqttService.ready;
            mqttService.subscribeTopic('southbound/#');


            await mqttService.publishMessage(Environment.mqttBroker!.southboundTopic!, JSON.stringify(
                {
                    dataType: 'Boolean',
                    node: nodeId2,
                    value: true
                }
            ));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
main();


//await opcuaClient.subscribe([nodeId, nodeId1, nodeId2, nodeId3]);
            //console.log('NAMESPACES ARE==>', await opcuaClient.getNamespaces());

            //console.log('DIRECT READ IS: ', await opcuaClient.readValue(nodeId2));
            
            //opcuaClient.writeTag(nodeId, 10011, DataType.Int32);
            //opcuaClient.readTag(nodeId);
            // opcuaClient.writeTag(nodeId2, 10011, DataType.Float);
            //await opcuaClient.browseWithClient();
            //await opcuaClient.browseAllNodes();
            //console.log('browse complete');