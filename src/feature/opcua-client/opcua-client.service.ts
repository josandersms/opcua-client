import {
    AttributeIds,
    OPCUAClient,
    DataValue,
    BrowseResult,
    ReferenceDescription,
    TimestampsToReturn,
    StatusCodes,
    DataType,
    ClientSession,
    makeBrowsePath,
    NodeId,
    NodeIdLike,
    NodeClassMask,
    BrowseDirection,
    ResultMask,
    NodeIdType,
    BrowseDescriptionLike,
    ReferenceTypeIds,
    makeExpandedNodeId,
    WriteValueOptions,
    DataValueLike,
    ClientSubscription,
  } from 'node-opcua';
  import { Subject } from 'rxjs';
  
 
export class OPCClient {
    private client!: OPCUAClient;
    private endpointUrl: string;
    private isClientCreated$: Subject<boolean> = new Subject<boolean>();
    private isConnected$: Subject<boolean> = new Subject<boolean>();
    private namespace: string;
    private nodeId: string;
    private session?: ClientSession;
    private subscription?: Promise<ClientSubscription>;
    public ready: Promise<any>;

    constructor(endpointUrl: string, namespace: string, nodeId: string) {
        this.endpointUrl = endpointUrl;
        this.namespace = namespace;
        this.nodeId = nodeId;
        
        this.isConnected$.subscribe((status: boolean) => {
            console.log(status);
            if (status) {
                this.client?.withSessionAsync(this.endpointUrl, async (session: ClientSession) => { 
                    this.session = session;
                    console.log('Session created!');
                    this.createSubscription();
                    console.log('Subscription created!');
                });
            }
        });
        this.createClient();
               
        this.client.addListener('backoff', () => console.log('retrying connection'));
        this.client.addListener('connected', () => {
            console.log('OPCUA Client Connected!');
            this.isConnected$.next(true);
        });
        this.ready = new Promise(async (resolve, reject) => {
            try {

                resolve(undefined);
            } catch (error) {
                reject(error);
            }
        });
        // this.isClientCreated$.subscribe((status: boolean) => {
        //     console.log(status);
        //     if (status) {
        //         this.client!.on('backoff', () => console.log('retrying connection'));
        //         this.client!.on('connected', () => {
        //             console.log('OPCUA Client Connected!');
        //             this.isConnected$.next(true);
        //         });
        //         this.client!.on('abort', () => {
        //             console.error('OPCUA Client Aborted the connection');
        //             //this.isConnected$.next(false);
        //         });
        //     }
        // });
        
    }

    public createClient(): void {

        this.client = OPCUAClient.create({
            endpointMustExist: false,
            connectionStrategy: {
                maxRetry: 2,
                initialDelay: 2000,
                maxDelay: 10 * 1000,
            }
        });
        this.isClientCreated$.next(true);

    }

    public async browseAllNodes(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
                    const namespaceIndex = (await session.readNamespaceArray()).findIndex(x => x === 'ChevronLD');
                    if (namespaceIndex === undefined) throw('No namespaces!');
                    const chevronFolderId = `ns=${namespaceIndex};i=1001`;
                    const browseResult = await session!.browse({
                        nodeId: chevronFolderId,
                        browseDirection: BrowseDirection.Forward,
                        referenceTypeId: ReferenceTypeIds.Organizes
                    } as BrowseDescriptionLike);

                    if (browseResult.statusCode === StatusCodes.Good) {
                        browseResult.references!.forEach((result) => {
                            console.log('->', makeExpandedNodeId(result.nodeId));
                        });
                    } else {
                        throw('Could not browse!');
                    }
                });
                resolve(undefined);
            } catch (error) {
                reject(error);
            }                
        });
    }

    public async browseWithClient(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
                    const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                    // const browseResult: BrowseResult = (await session.browse({
                    //     nodeId: `ns=9;s=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI`,
                    //     referenceTypeId: ReferenceTypeIds.Organizes,
                    //     includeSubtypes: true,
                    //     browseDirection: BrowseDirection.Forward
                    // })) as BrowseResult;
                    // console.log('====>> GOT BROWSE RESULT', browseResult);
                    // for (const reference of browseResult!.references!) {
                    //     console.log('->', reference.browseName.toString());
                    // };
                    //console.log('===>>> NAMESPACES ARE:', await session.readNamespaceArray());
                    
                    // console.log(
                    //     browseResult?.references?.map((r: ReferenceDescription) => r.browseName.toString())
                    // );
                    // const browsePath = makeBrowsePath('RootFolder', '/Types');
                    // const result = (await session.translateBrowsePath(browsePath));
                    // console.log('===>>>> BROWSE PATH RESULT:', result);
                    // result.targets?.forEach((res) => {
                    //     console.log(res);
                    //     console.log(res.targetId.toString());
                    // });
                    const dataValue = await session.read({ nodeId: `ns=${namespaceIndex};${this.nodeId}`, attributeId: AttributeIds.Value });
                    if (dataValue.statusCode !== StatusCodes.Good) {
                        console.log('Could not read ', this.nodeId);
                        console.log(dataValue);
                        
                    } else {
                        console.log(` value of ${this.nodeId.toString()} = ${dataValue.value.toString()}`);
                        const nodeToWrite: WriteValueOptions = {
                            nodeId: `ns=${namespaceIndex};${this.nodeId}`,
                            value: {
                                value: {
                                    dataType: DataType.Float,
                                    value: 10014
                                }
                            }
                        };
                        session.write(nodeToWrite, (response) => {
                            if (!response?.cause) {
                                console.log('wrote tag!');
                                console.log(response?.message);
                            } else {
                                console.log('COULD NOT WRITE TAG!');
                            }
                        });
                    }
                    
                });
                resolve(undefined);
            } catch(error) {
                reject(error);
            }
        });
    }

    public async createSubscription(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('creating subscription');
                this.subscription = this.session?.createSubscription2({
                    requestedPublishingInterval: 1000,
                    requestedLifetimeCount: 100,
                    requestedMaxKeepAliveCount: 20,
                    maxNotificationsPerPublish: 10,
                    publishingEnabled: true,
                    priority: 10,
                });
                resolve(undefined);
            } catch (error) {
                reject(error);
            }
        });
    }
    public async monitorSubscription(): Promise<any> {
        
        
        // const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
        // const nodeId = `ns=${namespaceIndex};${this.nodeId}`;
        // const monitoredItem = await this.subscription.monitor({
        //         nodeId,
        //         attributeId: AttributeIds.Value,
        //     },
        //     {
        //         samplingInterval: 100,
        //         discardOldest: true,
        //         queueSize: 10,
        //     },
        //     TimestampsToReturn.Both
        // );
    
        // monitoredItem.on('changed', (dataValue: DataValue) => {
        //     console.log(` VALUE CHANGED TO = ${dataValue.value.value.toString()}`);
        // });
          
        // await new Promise((resolve) => setTimeout(resolve, 10000));
        // await subscription.terminate();

    }
    public async writeTag(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
                    const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                   
                    const nodeToWrite: WriteValueOptions = {
                        nodeId: `ns=${namespaceIndex};${this.nodeId}`,
                        value: {
                            value: {
                                dataType: DataType.Float,
                                value: 10014
                            }
                        }
                    };
                    session.write(nodeToWrite, (response) => {
                        if (!response?.cause) {
                            console.log('wrote tag!');
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

