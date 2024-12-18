import { AttributeIds, ClientSession, DataType, OPCUAClient, StatusCodes, WriteValueOptions } from 'node-opcua';
 
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
                            console.log(`Tag ${nodeToWrite.nodeId} written with value: ${nodeToWrite.value?.value?.value}`);
                            if (response) console.log(response);
                        } else {
                            console.log(`COULD NOT WRITE TAG ${nodeToWrite.nodeId}`);
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