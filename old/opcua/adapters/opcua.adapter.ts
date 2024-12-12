import { Subject, SubjectLike } from 'rxjs';

export class OpcUaAdapter {
    private PLC: any;
    public internalName: string = '';
    public ready: Promise<any>;

    constructor() {
        this.ready = new Promise(async (resolve) => {
            try {
                resolve(undefined);
            } catch (error) {
                console.error(error);
            }
        });
    }

    
}

export interface IOpcUaAdapter {
    events: Subject<IOpcUaTagEvent>;
    internalName: string;
    ready: Promise<any>;

    addTagSubscription(tag: string): Promise<void>;

    connect(ipAddress: string, slot?: number, scanRate?: number): Promise<void>;

    get isScanning(): boolean;

    pause(): void;

    get properties(): unknown;

    start(): Promise<void>;

    subscribeTags(): Promise<void>;
}

export interface IOpcUaTagEvent {
    lastValue?: any;
    message?: string;
    tag: string;
    value?: any;
}