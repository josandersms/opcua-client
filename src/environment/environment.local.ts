import { environment } from '../common/types/environment.type';

export const Environment: environment = {
    mqttBroker: {
        uri: 'mqtt://localhost:1883'
    },
    opcuaServer: {
        certificateManager: {
            automaticallyAcceptUnknownCertificate: true,
            keySize: 2048,
            rootFolder: './pki/'
        },
        endpointUri: 'opc.tcp://192.168.50.15:49320',
        namespace: 'ChevronLD',
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
            securityMode: 'SignAndEncrypt',
            securityPolicy: 'Basic256Sha256'
        }
    },
    isProduction: false
};

//endpointUri: 'opc.tcp://192.168.50.15:59100',