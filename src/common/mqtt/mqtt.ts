export class MqttSubscriptionMessage<T> {
    public topic: string;
    public value: T;

    constructor(topic: string, value: T) {
        this.value = value;
        this.topic = topic;
    }
}