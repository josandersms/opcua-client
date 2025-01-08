"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = void 0;
var _utility = require("../common/utility");
var Environment = exports.Environment = {
  mqttBroker: {
    southboundTopic: process.env['OPCUAC__MQTT_BROKER__SOUTHBOUND_TOPIC'],
    uri: process.env['OPCUAC__MQTT_BROKER__URI']
  },
  opcuaServer: {
    endpointUri: process.env['OPCUAC__OPCUA_SERVER__ENDPOINT_URI'],
    namespace: process.env['OPCUAC__OPCUA_SERVER__NAMESPACE'],
    options: {
      applicationName: process.env['OPCUAC__OPCUA_SERVER__APPLICATION_NAME'],
      applicationUri: process.env['OPCUAC__OPCUA_SERVER__APPLICATION_URI'],
      clientName: process.env['OPCUAC__OPCUA_SERVER__CLIENT_NAME'],
      connectionStrategy: {
        initialDelay: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__INITIAL_DELAY']),
        maxDelay: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__MAX_DELAY']),
        maxRetry: parseInt(process.env['OPCUAC__OPCUA_SERVER__CONNECTION_STRATEGY__MAX_RETRY'])
      },
      endpointMustExist: (0, _utility.checkTrue)(process.env['OPCUAC__OPCUA_SERVER__ENDPOINT_MUST_EXIST']),
      securityMode: process.env['OPCUAC__OPCUA_SERVER__SECURITY_MODE'],
      securityPolicy: process.env['OPCUAC__OPCUA_SERVER__SECURITY_POLICY']
    }
  },
  isProduction: true
};