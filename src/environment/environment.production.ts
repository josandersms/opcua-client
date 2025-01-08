import { environment } from '../common/types/environment.type';
import { checkTrue } from '~app/common/utility';

export const Environment: environment = {
    mqttBroker: {
        southboundTopic: process.env['OPCUAC__MQTT_BROKER__SOUTHBOUND_TOPIC'],
        uri: process.env['OPCUAC__MQTT_BROKER__URI']
    },
    opcuaServer: {
        endpointUri: process.env['OPCUAC__OPCUA_SERVER__ENDPOINT_URI']!,
        namespace: process.env['OPCUAC__OPCUA_SERVER__NAMESPACE']!,
        options: {
            applicationName: process.env['OPCUAC__OPCUA_SERVER__APPLICATION_NAME'],
            applicationUri: process.env['OPCUAC__OPCUA_SERVER__APPLICATION_URI'],
            clientName: process.env['OPCUAC__OPCUA_SERVER__CLIENT_NAME']
,            connectionStrategy: {
                initialDelay: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__INITIAL_DELAY'] as string),
                maxDelay: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__MAX_DELAY'] as string),
                maxRetry: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__MAX_RETRY'] as string),
            },
            endpointMustExist: checkTrue(process.env['OPCUAC__OPCUA_SERVER__ENDPOINT_MUST_EXIST'] as string), 
            securityMode: process.env['OPCUAC__OPCUA_SERVER__SECURITY_MODE'],
            securityPolicy: process.env['OPCUAC__OPCUA_SERVER__SECURITY_POLICY'],
        }
    },
    isProduction: true
};