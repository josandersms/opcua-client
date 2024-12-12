"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opcua_client_service_1 = require("./feature/opcua-client/opcua-client.service");
const endpointUrl = 'opc.tcp://192.168.50.15:59100';
const nodeId = 'nsu=ChevronLD;s=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI';
const main = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const opcuaClient = new opcua_client_service_1.OPCClient(endpointUrl, nodeId);
            await opcuaClient.ready;
            await opcuaClient.browseWithClient();
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRkFBd0U7QUFFeEUsTUFBTSxXQUFXLEdBQVcsK0JBQStCLENBQUE7QUFDM0QsTUFBTSxNQUFNLEdBQVcsdUhBQXVILENBQUM7QUFFL0ksTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFtQixFQUFFO0lBQ25DLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUM7WUFDRCxNQUFNLFdBQVcsR0FBYyxJQUFJLGdDQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN4QixNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxFQUFFLENBQUMifQ==