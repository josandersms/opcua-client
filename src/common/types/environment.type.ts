export type environment = {
    mqttBroker?: {
        uri?: string
    },
    opcuaServer: {
        certificateManager?: {
            automaticallyAcceptUnknownCertificate?: boolean,
            keySize?: 2048 | 3072 | 4096,
            name?: string,
            rootFolder?: string // defaults to '%APPDATA%/node-opcua-default'
        },
        endpointUri: string,
        namespace?: string, // Namespace to use
        options: {
            applicationName?: string,
            applicationUri?: string,
            certificateFile?: string, // defaults to '${certificateManager/rootFolder}/own/certs/client_certificate.pem',
            clientName?: string,
            connectionStrategy?: {
                initialDelay?: number,
                maxDelay?: number,
                maxRetry?: number,
                randomisationFactor?: number
            },
            dataTypeExtractStrategy?: 'Auto' | 'Force103' | 'Force104' | 'Both', // Options are Auto, Force103, Force104, Both respectively 0, 1, 2, 3
            defaultSecureTokenLifetime?: number, // in ms
            defaultTransactionTimeout?: number, // im ms
            discoveryUrl?: string, // typically ${endpointURI}/discovery
            endpointMustExist?: boolean, 
            keepAliveInterval?: number, // number in ms that the client should wait until it sends a keep alive message to the server.
            keepPendingSessionsOnDisconnect?: boolean, // if set to true, pending session will not be automatically closed when disconnect is called
            keepSessionAlive?: boolean, // can be set when the client doesn't create subscription. In this case, the client will send a dummy request on a regular basis to keep the connection active.
            privateKeyFile?: string, // defaults to '${certificateManager/rootFolder}/own/private/private_key.pem'
            requestedSessionTimeout?: number, // the requested session timeout in CreateSession (ms)
            securityMode?: string | 'Invalid' | 'None' | 'Sign' | 'SignAndEncrypt', // Options are Invalid, None, Sign, SignAndEncrypt respectively 0, 1, 2, 3
            securityPolicy?: string | 'Invalid' | 'None' | 'Basic128' | 'Basic192' | 'Basic192Rsa15' | 'Basic256Rsa15' | 'Basic256Sha256' | 'Aes128_Sha256_RsaOaep' | 'Aes256_Sha256_RsaPss' | 'PubSub_Aes128_CTR' | 'PubSub_Aes256_CTR' | 'Basic128Rsa15' | 'Basic256'
            serverCertificate?: Buffer,
            tokenRenewalInterval?: number, // if not specified or set to 0 , token renewal will happen around 75% of the defaultSecureTokenLifetime
            transportSettings?: {
                maxChunkCount?: number,
                maxMessageSize?: number,
                receiveBufferSize?: number,
                sendBufferSize?: number
            },
            transportTimeout?: number // in ms
        },
        sessionOptions?: {
            password?: string;
            policyId?: string;
            privateKey?: string;
            type: 'Anonymous' | 'Certificate' | 'Username',
            userName?: string;
        }
    },
    isProduction?: boolean
}