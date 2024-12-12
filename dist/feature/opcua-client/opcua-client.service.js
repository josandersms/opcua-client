"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPCClient = void 0;
const node_opcua_1 = require("node-opcua");
class OPCClient {
    client;
    endpointUrl;
    nodeId;
    ready;
    constructor(endpointUrl, nodeId) {
        this.endpointUrl = endpointUrl;
        this.nodeId = nodeId;
        this.ready = new Promise(async (resolve, reject) => {
            try {
                await this.createClient();
                resolve(undefined);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async createClient() {
        return new Promise(async (resolve, reject) => {
            try {
                this.client = node_opcua_1.OPCUAClient.create({
                    endpointMustExist: false,
                    connectionStrategy: {
                        maxRetry: 2,
                        initialDelay: 2000,
                        maxDelay: 10 * 1000,
                    }
                });
                this.client.on('backoff', () => console.log('retrying connection'));
                this.client.on('connected', () => {
                    console.log('OPCUA Client Connected!');
                    resolve(undefined);
                });
                this.client.on('abort', () => {
                    console.error('OPCUA Client Aborted the connection');
                    throw ('OPCUA Client Aborted!');
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async browseWithClient() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.withSessionAsync(this.endpointUrl, async (session) => {
                    const browseResult = (await session.browse('RootFolder'));
                    console.log(browseResult?.references?.map((r) => r.browseName.toString()).join('\n'));
                    const dataValue = await session.read({ nodeId: this.nodeId, attributeId: node_opcua_1.AttributeIds.Value });
                    if (dataValue.statusCode !== node_opcua_1.StatusCodes.Good) {
                        console.log('Could not read ', this.nodeId);
                    }
                    console.log(` value of ${this.nodeId.toString()} = ${dataValue.value.toString()}`);
                });
                resolve(undefined);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.OPCClient = OPCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjdWEtY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZS9vcGN1YS1jbGllbnQvb3BjdWEtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBVXNCO0FBR3RCLE1BQWEsU0FBUztJQUNWLE1BQU0sQ0FBZTtJQUNyQixXQUFXLENBQVM7SUFDcEIsTUFBTSxDQUFTO0lBQ2hCLEtBQUssQ0FBZTtJQUUzQixZQUFZLFdBQW1CLEVBQUUsTUFBYztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVcsQ0FBQyxNQUFNLENBQUM7b0JBQzdCLGlCQUFpQixFQUFFLEtBQUs7b0JBQ3hCLGtCQUFrQixFQUFFO3dCQUNsQixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxZQUFZLEVBQUUsSUFBSTt3QkFDbEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJO3FCQUNwQjtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO29CQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO29CQUNyRCxNQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksQ0FBQyxNQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBc0IsRUFBRSxFQUFFO29CQUNuRixNQUFNLFlBQVksR0FBaUIsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQ3BELFlBQVksQ0FDZixDQUFpQixDQUFDO29CQUVuQixPQUFPLENBQUMsR0FBRyxDQUNQLFlBQVksRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDakcsQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUseUJBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUMvRixJQUFJLFNBQVMsQ0FBQyxVQUFVLEtBQUssd0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQUMsT0FBTSxLQUFLLEVBQUUsQ0FBQztnQkFDWixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBdkVELDhCQXVFQyJ9