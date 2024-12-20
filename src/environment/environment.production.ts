import { environment } from '../common/types/environment.type';

export const Environment: environment = {
    mqttBroker: {
        uri: process.env['MQTT_BROKER__URI']
    },
    opcuaServer: {
        endpointUri: process.env['OPCUA_SERVER__ENDPOINT_URI']!,
        namespace: process.env['OPCUA_SERVER__NAMESPACE']!,
        options: {
            applicationName: process.env['OPCUA_SERVER__APPLICATION_NAME'],
            applicationUri: process.env['OPCUA_SERVER__APPLICATION_URI'],
            connectionStrategy: {
                initialDelay: process.env['OPCUA_SERVER__CONNECTION_STRATEGY__INITIAL_DELAY'] as unknown as number,
                maxDelay: process.env['OPCUA_SERVER__CONNECTION_STRATEGY__MAX_DELAY'] as unknown as number,
                maxRetry: process.env['OPCUA_SERVER__CONNECTION_STRATEGY__MAX_RETRY'] as unknown as number,
            },
            endpointMustExist: false, 
            securityMode: process.env['OPCUA_SERVER__SECURITY_MODE'],
            securityPolicy: process.env['OPCUA_SERVER__SECURITY_POLICY'],
        }
    },
    isProduction: true
};