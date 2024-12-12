import { DataType, UAObject, UAVariable } from 'node-opcua';
import { Subject } from 'rxjs';

export class Device {
    public device: UAObject;
    public variables: Map<string, DeviceVariable<unknown>> = new Map<string, DeviceVariable<unknown>>();

    constructor(device: UAObject) {
        this.device = device;
    }
}

export class DeviceVariable<T> {
    private _value: T | undefined = undefined;
    public value$: Subject<T> = new Subject<T>();
    public variable: UAVariable;

    public get value(): T | undefined {
        return this._value;
    }
    
    public set value(value: T) {
        this._value = value;
        this.value$.next(value);
    }

    constructor(variable: UAVariable) {
        this.variable = variable;
    }
}

export class Tag {
    public dataType: DataType;
    public mappedTag?: string;
    public minimumSamplingInterval;
    public name: string;
    public node?: string;

    constructor(name: string, options: {dataType?: DataType, mappedTag?: string, minimumSamplingInterval?: number, node?: string}) {
        this.name = name;
        this.dataType = options.dataType ? options.dataType : DataType.Variant;
        this.mappedTag = options.mappedTag ? options.mappedTag : name;
        this.minimumSamplingInterval = options.minimumSamplingInterval ? options.minimumSamplingInterval : 1000;
        this.node = options.node ? options.node : undefined;
    }
}
