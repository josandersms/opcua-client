import { filter } from 'rxjs/operators';
import { ConstantStatusCode, DataType } from 'node-opcua';
import { command } from './common/types/command.type';
import { MqttService } from './common/mqtt';
import { OPCClient } from './feature/opcua-client/opcua-client.service';
import { Environment } from './environment';

const main = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            /** Start OPC-UA Client and listen to client status updates */
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
        
            /** Start MQTT Listener Service and subscribe to southbound/# */
            const mqttService: MqttService = new MqttService(Environment.mqttBroker!.uri!);
            mqttService.subscriptions$.pipe(filter(message => message.topic === Environment.mqttBroker?.southboundTopic)).subscribe(async (message) => {
                const messageValue: command = JSON.parse(message.value);
                const dataTypeKey: keyof typeof DataType = messageValue.dataType;
                const result: ConstantStatusCode = await opcuaClient.writeTag(messageValue.node, messageValue.value, DataType[dataTypeKey]);
                console.log('OPC-UA Tag Write Result is:', result.name, '-', result.description);
            });
            await mqttService.ready;
            mqttService.subscribeTopic('southbound/#');

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
main();