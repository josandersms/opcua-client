"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.DeviceVariable = exports.Device = void 0;
const node_opcua_1 = require("node-opcua");
const rxjs_1 = require("rxjs");
class Device {
    device;
    variables = new Map();
    constructor(device) {
        this.device = device;
    }
}
exports.Device = Device;
class DeviceVariable {
    _value = undefined;
    value$ = new rxjs_1.Subject();
    variable;
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.value$.next(value);
    }
    constructor(variable) {
        this.variable = variable;
    }
}
exports.DeviceVariable = DeviceVariable;
class Tag {
    dataType;
    mappedTag;
    minimumSamplingInterval;
    name;
    node;
    constructor(name, options) {
        this.name = name;
        this.dataType = options.dataType ? options.dataType : node_opcua_1.DataType.Variant;
        this.mappedTag = options.mappedTag ? options.mappedTag : name;
        this.minimumSamplingInterval = options.minimumSamplingInterval ? options.minimumSamplingInterval : 1000;
        this.node = options.node ? options.node : undefined;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjdWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL29wY3VhL29wY3VhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE0RDtBQUM1RCwrQkFBK0I7QUFFL0IsTUFBYSxNQUFNO0lBQ1IsTUFBTSxDQUFXO0lBQ2pCLFNBQVMsR0FBeUMsSUFBSSxHQUFHLEVBQW1DLENBQUM7SUFFcEcsWUFBWSxNQUFnQjtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFQRCx3QkFPQztBQUVELE1BQWEsY0FBYztJQUNmLE1BQU0sR0FBa0IsU0FBUyxDQUFDO0lBQ25DLE1BQU0sR0FBZSxJQUFJLGNBQU8sRUFBSyxDQUFDO0lBQ3RDLFFBQVEsQ0FBYTtJQUU1QixJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQVE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQVksUUFBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBakJELHdDQWlCQztBQUVELE1BQWEsR0FBRztJQUNMLFFBQVEsQ0FBVztJQUNuQixTQUFTLENBQVU7SUFDbkIsdUJBQXVCLENBQUM7SUFDeEIsSUFBSSxDQUFTO0lBQ2IsSUFBSSxDQUFVO0lBRXJCLFlBQVksSUFBWSxFQUFFLE9BQW1HO1FBQ3pILElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMscUJBQVEsQ0FBQyxPQUFPLENBQUM7UUFDdkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztDQUNKO0FBZEQsa0JBY0MifQ==