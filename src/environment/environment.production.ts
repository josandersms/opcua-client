export const Environment = {
    mqttBroker: {
        uri: process.env['MQTT_BROKER__URI']
    },
    opcuaServer: {
        endpointUri: process.env['OPCUA_SERVER__ENDPOINT_URI'],
        namespace: process.env['OPCUA_SERVER__NAMESPACE']
    }
};