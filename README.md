# OPC-UA Client and MQ Listener with Tag Writing

## Notes (TO BE REMOVED LATER)
```typescript
const nodeId: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
const nodeId1: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.aLeakDetectedZone1';
const nodeId3: string = 's=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.BS01_Bypass_SolVlv_Output';
const nodeId2: string = 's=ChevronLDTest.Model.Variable1';
await opcuaClient.subscribe([nodeId2]);

await opcuaClient.subscribe([nodeId, nodeId1, nodeId2, nodeId3]);
console.log('NAMESPACES ARE==>', await opcuaClient.getNamespaces());

console.log('DIRECT READ IS: ', await opcuaClient.readValue(nodeId2));

opcuaClient.writeTag(nodeId, 10011, DataType.Int32);
opcuaClient.readTag(nodeId);
opcuaClient.writeTag(nodeId2, 10011, DataType.Float);
await opcuaClient.browseWithClient();
await opcuaClient.browseAllNodes();
console.log('browse complete');
```