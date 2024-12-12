import {
    OPCUAClient,
    DataType,
    ClientSession,
    WriteValueOptions,
    AttributeIds,
    StatusCodes,
  } from 'node-opcua';
  
 
export class OPCClientBasic {
    private endpointUrl: string;
    private namespace: string;

    constructor(endpointUrl: string, namespace: string) {
        this.endpointUrl = endpointUrl;
        this.namespace = namespace;
    }

    public async readTag(tag: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const client = OPCUAClient.create({
                    endpointMustExist: false,
                    connectionStrategy: {
                        maxRetry: 2,
                        initialDelay: 2000,
                        maxDelay: 10 * 1000,
                    }
                });
                await client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
                    const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                    const dataValue = await session.read({ nodeId: `ns=${namespaceIndex};${tag}`, attributeId: AttributeIds.Value });
                    if (dataValue.statusCode !== StatusCodes.Good) {
                        console.log('Could not read ', tag);
                        console.log(dataValue);
                        throw(dataValue.statusCode);
                    } else {
                        console.log(` value of ${tag.toString()} = ${dataValue.value.toString()}`);
                        resolve(dataValue.value);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async writeTag(tag: string, value: any, valueType: DataType): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const client = OPCUAClient.create({
                    endpointMustExist: false,
                    connectionStrategy: {
                        maxRetry: 2,
                        initialDelay: 2000,
                        maxDelay: 10 * 1000,
                    }
                });
                await client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
                    const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                   
                    const nodeToWrite: WriteValueOptions = {
                        nodeId: `ns=${namespaceIndex};${tag}`,
                        value: {
                            value: {
                                dataType: valueType,
                                value: value
                            }
                        }
                    };
                    session.write(nodeToWrite, (response) => {
                        if (!response?.cause) {
                            console.log('wrote tag!');
                            console.log(response);
                            console.log(response?.message);
                        } else {
                            console.log('COULD NOT WRITE TAG!');
                        }
                    });
                    
                    
                });
                resolve(undefined);
            } catch(error) {
                reject(error);
            }
        });
    }
}
    //   await client.withSessionAsync(endpointUrl, async (session) => {
     

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

