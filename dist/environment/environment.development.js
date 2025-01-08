"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = void 0;
var Environment = exports.Environment = {
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
    endpointUri: 'opc.tcp://192.168.50.15:59100',
    namespace: 'ChevronLD',
    options: {
      applicationName: 'MSFT-IAI-OPCUA-Client',
      applicationUri: 'urn:cvxleakse30:MSFT-IAI-OPCUA-Client',
      clientName: 'MSFT-IAI-OPCUA-Client',
      connectionStrategy: {
        initialDelay: 3000,
        maxDelay: 10 * 1000,
        maxRetry: 2
      },
      endpointMustExist: false,
      securityMode: 'SignAndEncrypt',
      securityPolicy: 'Basic256Sha256'
    },
    sessionOptions: {
      type: 'Anonymous'
    }
  },
  isProduction: false
};