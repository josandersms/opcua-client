import {
    AttributeIds,
    OPCUAClient,
    DataValue,
    BrowseResult,
    ReferenceDescription,
    TimestampsToReturn,
    StatusCodes,
    DataType,
  } from 'node-opcua';
  
 
export class OPCClient {
    private client?: OPCUAClient;
    private endpointUrl: string;
    private nodeId: string;
    public ready: Promise<any>;

    constructor(endpointUrl: string, nodeId: string) {
        this.endpointUrl = endpointUrl;
        this.nodeId = nodeId;

        this.ready = new Promise(async (resolve, reject) => {
            try {
                await this.createClient();
                resolve(undefined);
            } catch (error) {
                reject(error);
            }
        });
       
    }

    public async createClient(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                this.client = OPCUAClient.create({
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
                    throw('OPCUA Client Aborted!');
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

    //   await client.withSessionAsync(endpointUrl, async (session) => {
     
    //     const browseResult: BrowseResult = (await session.browse(
    //       "RootFolder"
    //     )) as BrowseResult;
  
    //     console.log(
    //       browseResult.references
    //         .map((r: ReferenceDescription) => r.browseName.toString())
    //         .join("\n")
    //     );
  
    //     const dataValue = await session.read({
    //       nodeId,
    //       attributeId: AttributeIds.Value,
    //     });
    //     if (dataValue.statusCode !== StatusCodes.Good) {
    //       console.log("Could not read ", nodeId);
    //     }
    //     console.log(` value of ${nodeId.toString()} = ${dataValue.value.toString()}`);
  
    //     // step 5: install a subscription and monitored item
    //     const subscription = await session.createSubscription2({
    //       requestedPublishingInterval: 1000,
    //       requestedLifetimeCount: 100,
    //       requestedMaxKeepAliveCount: 20,
    //       maxNotificationsPerPublish: 10,
    //       publishingEnabled: true,
    //       priority: 10,
    //     });
  
    //     subscription
    //       .on("started", () =>
    //         console.log(
    //           "subscription started - subscriptionId=",
    //           subscription.subscriptionId
    //         )
    //       )
    //       .on("keepalive", () => console.log("keepalive"))
    //       .on("terminated", () => console.log("subscription terminated"));
  
    //     const monitoredItem = await subscription.monitor(
    //       {
    //         nodeId,
    //         attributeId: AttributeIds.Value,
    //       },
    //       {
    //         samplingInterval: 100,
    //         discardOldest: true,
    //         queueSize: 10,
    //       },
    //       TimestampsToReturn.Both
    //     );
  
    //     monitoredItem.on("changed", (dataValue: DataValue) => {
    //       console.log(` Temperature = ${dataValue.value.value.toString()}`);
    //     });
  
    //     await new Promise((resolve) => setTimeout(resolve, 10000));
    //     await subscription.terminate();
  
    //     const statusCode = await session.write({
    //       nodeId: "ns=7;s=Scalar_Static_Double",
    //       attributeId: AttributeIds.Value,
    //       value: {
    //         statusCode: StatusCodes.Good,
    //         sourceTimestamp: new Date(),
    //         value: {
    //           dataType: DataType.Double,
    //           value: 25.0,
    //         },
    //       },
    //     });
    //     console.log("statusCode = ", statusCode.toString());
  
    //     console.log(" closing session");
    //   });

