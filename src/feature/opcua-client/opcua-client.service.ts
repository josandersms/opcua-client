import {
    AttributeIds,
    OPCUAClient,
    DataValue,
    TimestampsToReturn,
    StatusCodes,
    DataType,
    ClientSession,
    BrowseDirection,
    BrowseDescriptionLike,
    ReferenceTypeIds,
    ClientSubscription,
    CreateSubscriptionRequestOptions,
    ClientMonitoredItem,
    SecurityPolicy,
    MessageSecurityMode,
    OPCUAClientOptions,
    OPCUACertificateManager,
    OPCUACertificateManagerOptions,
  } from 'node-opcua';
  import { Subject } from 'rxjs';
import { Environment } from '~app/environment';
  
export class OPCClient {
    private client!: OPCUAClient;
    private clientCertificateManager!: OPCUACertificateManager;
    private endpointUrl: string;
    private namespace: string;
    private session?: ClientSession;
    private subscription?: ClientSubscription;
    public subscription$: Subject<any> = new Subject<any>();
    public ready: Promise<any>;

    constructor(endpointUrl: string, namespace: string) {
        this.endpointUrl = endpointUrl;
        this.namespace = namespace;
        this.ready = new Promise(async (resolve, reject) => {
            try {
                
                if (Environment.opcuaServer.options.securityPolicy !== 'Invalid' && Environment.opcuaServer.options.securityPolicy !== 'None') {
                    this.clientCertificateManager = await this.createClientCertificateManager(Environment.opcuaServer?.certificateManager || {});
                }
                this.client = await this.createClient(this.buildClientOptions());
                console.log(this.buildClientOptions());
                    //discoveryUrl: `${this.endpointUrl}/discovery`, clientCertificateManager: this.clientCertificateManager, securityPolicy: SecurityPolicy.Basic256Sha256, securityMode: MessageSecurityMode.SignAndEncrypt});
                await this.client.connect(this.endpointUrl);
                this.session = await this.createSession(this.client);
                this.subscription = await this.createSubscription(this.session!, {
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

    public async browseNamespace(baseNode: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const namespaceIndex = (await this.session!.readNamespaceArray()).findIndex(x => x === this.namespace);
                if (namespaceIndex === undefined) throw('Namespace not found!');
                    const browseResult = await this.session!.browse({
                        nodeId: `ns=${namespaceIndex};${baseNode}`,
                        browseDirection: BrowseDirection.Forward,
                        referenceTypeId: ReferenceTypeIds.Organizes
                    } as BrowseDescriptionLike);
                    const response: any[] = [];
                    if (browseResult.statusCode === StatusCodes.Good) {
                        browseResult.references!.forEach((result) => {
                            response.push(result);
                        });
                    } else {
                        throw('Could not browse!');
                    }
                    resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    

    
    
    private buildClientOptions(): OPCUAClientOptions {
        const options: OPCUAClientOptions = {};
        let property: keyof typeof Environment.opcuaServer.options;
        for (property in Environment.opcuaServer.options) {
            options[property] = Environment.opcuaServer.options[property]
        }
        return options;
    }

    private async createClient(options: OPCUAClientOptions): Promise<OPCUAClient> {
        return new Promise((resolve) => {
            resolve(OPCUAClient.create({
                //discoveryUrl: options.discoveryUrl,
                //certificateFile: options.certificateFile,
                clientCertificateManager: options.clientCertificateManager,
                connectionStrategy: {
                    initialDelay: options.connectionStrategy?.initialDelay || 3000,
                    maxDelay: options.connectionStrategy?.maxDelay || 10 * 1000,
                    maxRetry: options.connectionStrategy?.maxRetry || 2
                },
                endpointMustExist: options.endpointMustExist || false,
                //privateKeyFile: options.privateKeyFile,
                securityMode: options.securityMode || MessageSecurityMode.None,
                securityPolicy: options.securityPolicy || SecurityPolicy.Basic256Sha256
            }));
        });
    }

    private async createClientCertificateManager(options: OPCUACertificateManagerOptions): Promise<OPCUACertificateManager> {
        return new Promise(async (resolve, reject) => {
            try {
                const clientCertificateManager: OPCUACertificateManager = new OPCUACertificateManager({
                    automaticallyAcceptUnknownCertificate: options.automaticallyAcceptUnknownCertificate || true,
                    keySize: options.keySize || 2048,
                    name: options.name,
                    rootFolder: options.rootFolder || './pki/'
                });
                resolve(clientCertificateManager);
            } catch (error) {
                reject(error);
            }
        });
    }

    private async createSession(client: OPCUAClient): Promise<ClientSession> {
        return new Promise(async (resolve, reject) => {
            try {
                client.createSession2((error: Error | null, session?: ClientSession) => {
                    if (error) {
                        throw(error);
                    } else if (session) {
                        resolve(session);
                    } else {
                        throw('No session was returned!');
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    private async createSubscription(session: ClientSession, options: CreateSubscriptionRequestOptions): Promise<ClientSubscription> {
        return new Promise(async (resolve, reject) => {
            try {
                const subscription: ClientSubscription = await session.createSubscription2(options);
                resolve(subscription);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    public async getNamespaces(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.session!.readNamespaceArray());
            } catch (error) {
                reject(error);
            }                
        });
    }

    public async subscribe(nodes: string[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.subscription!.on('started', () => {
                    this.subscription$.next({action: 'created'});
                });
                this.subscription!.on('keepalive', () => {
                    this.subscription$.next({action: 'keepalive'});
                });
                this.subscription!.on('terminated', () => {
                    this.subscription$.next({action: 'terminated'});
                });
                
                const namespaceIndex = (await this.session!.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                
                const monitoredItems: any[] = [];
                nodes.forEach((node: string) => {
                    monitoredItems.push(ClientMonitoredItem.create(
                        this.subscription!,
                        {
                            attributeId: AttributeIds.Value,
                            nodeId: `ns=${namespaceIndex};${node}`
                        },
                        {
                            discardOldest: true,
                            queueSize: 10,
                            samplingInterval: 100
                        },
                        TimestampsToReturn.Both
                    ).on('changed', (dataValue: DataValue) => {
                        const nodeNameLength: number = node.split('=')[1].split('.').length -1;
                        const nodeName: string = node.split('=')[1].split('.')[nodeNameLength];
                        this.subscription$.next({action: 'changed', value: {
                                fullTag: node,
                                namespace: this.namespace,
                                serverTimestamp: dataValue.serverTimestamp,
                                sourceTimestamp: dataValue.sourceTimestamp,
                                status: dataValue.statusCode.name,
                                statusCode: dataValue.statusCode.value,
                                tag: nodeName,
                                type: DataType[dataValue.value.dataType],
                                typeCode: dataValue.value.dataType,
                                value: dataValue.value.value
                            }
                        });
                    }));
                });
               resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public async readValue(node: string): Promise<DataValue> {
        return new Promise(async (resolve, reject) => {
            try {
                const namespaceIndex = (await this.session!.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                const result = await this.session?.read({ attributeId: AttributeIds.Value, nodeId: `ns=${namespaceIndex};${node}` });
                if (!result) throw('could not read tag!');
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    

    // public async browseWithClient(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
    //                 const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
    //                 // const browseResult: BrowseResult = (await session.browse({
    //                 //     nodeId: `ns=9;s=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI`,
    //                 //     referenceTypeId: ReferenceTypeIds.Organizes,
    //                 //     includeSubtypes: true,
    //                 //     browseDirection: BrowseDirection.Forward
    //                 // })) as BrowseResult;
    //                 // console.log('====>> GOT BROWSE RESULT', browseResult);
    //                 // for (const reference of browseResult!.references!) {
    //                 //     console.log('->', reference.browseName.toString());
    //                 // };
    //                 //console.log('===>>> NAMESPACES ARE:', await session.readNamespaceArray());
                    
    //                 // console.log(
    //                 //     browseResult?.references?.map((r: ReferenceDescription) => r.browseName.toString())
    //                 // );
    //                 // const browsePath = makeBrowsePath('RootFolder', '/Types');
    //                 // const result = (await session.translateBrowsePath(browsePath));
    //                 // console.log('===>>>> BROWSE PATH RESULT:', result);
    //                 // result.targets?.forEach((res) => {
    //                 //     console.log(res);
    //                 //     console.log(res.targetId.toString());
    //                 // });
    //                 const dataValue = await session.read({ nodeId: `ns=${namespaceIndex};${this.nodeId}`, attributeId: AttributeIds.Value });
    //                 if (dataValue.statusCode !== StatusCodes.Good) {
    //                     console.log('Could not read ', this.nodeId);
    //                     console.log(dataValue);
                        
    //                 } else {
    //                     console.log(` value of ${this.nodeId.toString()} = ${dataValue.value.toString()}`);
    //                     const nodeToWrite: WriteValueOptions = {
    //                         nodeId: `ns=${namespaceIndex};${this.nodeId}`,
    //                         value: {
    //                             value: {
    //                                 dataType: DataType.Float,
    //                                 value: 10014
    //                             }
    //                         }
    //                     };
    //                     session.write(nodeToWrite, (response) => {
    //                         if (!response?.cause) {
    //                             console.log('wrote tag!');
    //                             console.log(response?.message);
    //                         } else {
    //                             console.log('COULD NOT WRITE TAG!');
    //                         }
    //                     });
    //                 }
                    
    //             });
    //             resolve(undefined);
    //         } catch(error) {
    //             reject(error);
    //         }
    //     });
    // }


    //public async monitorSubscription(): Promise<any> {
        
        
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

   // }
    // public async writeTag(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
    //                 const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
                   
    //                 const nodeToWrite: WriteValueOptions = {
    //                     nodeId: `ns=${namespaceIndex};${this.nodeId}`,
    //                     value: {
    //                         value: {
    //                             dataType: DataType.Float,
    //                             value: 10014
    //                         }
    //                     }
    //                 };
    //                 session.write(nodeToWrite, (response) => {
    //                     if (!response?.cause) {
    //                         console.log('wrote tag!');
    //                         console.log(response?.message);
    //                     } else {
    //                         console.log('COULD NOT WRITE TAG!');
    //                     }
    //                 });
                    
                    
    //             });
    //             resolve(undefined);
    //         } catch(error) {
    //             reject(error);
    //         }
    //     });
    // }
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

