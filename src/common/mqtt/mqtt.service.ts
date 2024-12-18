import { connectAsync, MqttClient } from 'mqtt';
import { Subject } from 'rxjs';
import { MqttSubscriptionMessage } from './mqtt';

export class MqttService {
    private client!: MqttClient;
    public ready: Promise<any>;
    public status: Subject<string> = new Subject<string>();
    public subscriptions$: Subject<MqttSubscriptionMessage<any>> = new Subject<MqttSubscriptionMessage<any>>();

    constructor(uri: string) {
        this.ready = new Promise(async (resolve, reject) => {
            try {
                this.client.on('connect', () => {
                    this.status.next('CONNECTED');
                });
                this.client.on('disconnect', () => {
                    this.status.next('DISCONNECTED');
                });
                this.client.on('error', (error) => {
                    this.status.next(`ERROR: ${error}`);
                });
                this.client = await connectAsync(uri);
                
                resolve(undefined);
            } catch (error) {
                this.status.next('ERROR');
                reject(error);
            }
        });
    }

    public async subscribeTopic(topic: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const granted = await this.client.subscribeAsync(topic);
                if (!granted) throw(`Could not subscribe to ${topic}`);
                this.client.on('message', (topic: string, payload: Buffer) => {
                    this.subscriptions$.next(new MqttSubscriptionMessage<any>(topic, payload.toString()));
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public async unsubscribeTopic(topic: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.unsubscribeAsync(topic);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}