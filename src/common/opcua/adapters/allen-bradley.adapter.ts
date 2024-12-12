import { Controller, Tag } from 'ethernet-ip';
import { ConfigurationService } from '~app/common/configuration';
import { IOpcUaAdapter, IOpcUaTagEvent } from './opcua.adapter';
import { Subject } from 'rxjs';

export class AllenBradleyAdapter implements IOpcUaAdapter {
    //private configuration: ConfigurationService = ConfigurationService.instance;
    private PLC: Controller = new Controller();

    public events: Subject<IOpcUaTagEvent> = new Subject<IOpcUaTagEvent>();
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

    public async addTagSubscription(tag: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Adding subscription for tag', tag);
                this.PLC.subscribe(new Tag(tag));
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async connect(ipAddress: string, slot: number = 0, scanRate: number = 200): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                
                await this.PLC.connect(ipAddress, slot);
                this.internalName = (this.PLC.properties as any)['name'];

                // Set the scan rate, if not provided, default to 200ms
                this.PLC.scan_rate = scanRate;

                resolve();
            } catch (error: any) {
                reject(error as Error);
            }
        });
    }

    public pause(): void {
        this.PLC.pauseScan();
    }

    public get properties(): Controller['properties'] {
        return this.PLC.properties;
    }

    public get isScanning(): boolean {
        return this.PLC.scanning;
    }

    public async start(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.PLC.scan();
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

    public async subscribeTags(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.PLC.forEach((tag: any) => {
                    tag.on('Initialized', () => {
                        //console.log('Initialized tag', tag);
                        this.events.next({tag: tag.name, value:tag.value, message: 'Tag Initialized'});
                    });
                    tag.on('Changed', (tag: Tag, lastValue: unknown) => {
                        //console.log('Changed tag', tag.name, tag.value);
                        this.events.next({lastValue, tag: tag.name,  value: tag.value});
                    });
                    tag.on('Error', (err: Error) => {
                        //console.log('Tag error on tag', tag, 'error', err);
                        this.events.error(err);
                    });
                });
                resolve();
            } catch (error: any) {
                reject(new Error(error));
            }
        });
    }

}