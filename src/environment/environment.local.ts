import { environment } from '../common/types/environment.type';

export const Environment: environment = {
    mqttBroker: {
        southboundTopic: 'southbound/commanding',
        uri: 'mqtt://10.1.0.5:1883'
    },
    opcuaServer: {
        certificateManager: {
            automaticallyAcceptUnknownCertificate: true,
            keySize: 2048,
            rootFolder: './pki/'
        },
        endpointUri: 'opc.tcp://127.0.0.1:59100', //endpointUri: 'opc.tcp://192.168.50.15:59100',
        namespace: 'ChevronLDTest',
        options: {
            applicationName: 'MSFT-IAI-OPCUA-Client',
            applicationUri: 'urn:cvxleakse30:MSFT-IAI-OPCUA-Client',
            clientName: 'MSFT-IAI-OPCUA-Client',
            connectionStrategy: {
                initialDelay: 3000,
                maxDelay: 10 * 1000,
                maxRetry: 2,
            },
            endpointMustExist: false, 
            securityMode: 'None',
            securityPolicy: 'None'
        },
        sessionOptions: {
            password: 'Marsden1',
            type: 'Username',
            userName: 'TestUser'
        }
    },
    isProduction: false
};