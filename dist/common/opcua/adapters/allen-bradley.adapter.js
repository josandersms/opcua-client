"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllenBradleyAdapter = void 0;
const ethernet_ip_1 = require("ethernet-ip");
const rxjs_1 = require("rxjs");
class AllenBradleyAdapter {
    PLC = new ethernet_ip_1.Controller();
    events = new rxjs_1.Subject();
    internalName = '';
    ready;
    constructor() {
        this.ready = new Promise(async (resolve) => {
            try {
                resolve(undefined);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    async addTagSubscription(tag) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Adding subscription for tag', tag);
                this.PLC.subscribe(new ethernet_ip_1.Tag(tag));
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async connect(ipAddress, slot = 0, scanRate = 200) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.PLC.connect(ipAddress, slot);
                this.internalName = this.PLC.properties['name'];
                this.PLC.scan_rate = scanRate;
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    pause() {
        this.PLC.pauseScan();
    }
    get properties() {
        return this.PLC.properties;
    }
    get isScanning() {
        return this.PLC.scanning;
    }
    async start() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.PLC.scan();
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
    async subscribeTags() {
        return new Promise(async (resolve, reject) => {
            try {
                this.PLC.forEach((tag) => {
                    tag.on('Initialized', () => {
                        this.events.next({ tag: tag.name, value: tag.value, message: 'Tag Initialized' });
                    });
                    tag.on('Changed', (tag, lastValue) => {
                        this.events.next({ lastValue, tag: tag.name, value: tag.value });
                    });
                    tag.on('Error', (err) => {
                        this.events.error(err);
                    });
                });
                resolve();
            }
            catch (error) {
                reject(new Error(error));
            }
        });
    }
}
exports.AllenBradleyAdapter = AllenBradleyAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsZW4tYnJhZGxleS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbW1vbi9vcGN1YS9hZGFwdGVycy9hbGxlbi1icmFkbGV5LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQThDO0FBRzlDLCtCQUErQjtBQUUvQixNQUFhLG1CQUFtQjtJQUVwQixHQUFHLEdBQWUsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFFcEMsTUFBTSxHQUE0QixJQUFJLGNBQU8sRUFBa0IsQ0FBQztJQUNoRSxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLEtBQUssQ0FBZTtJQUUzQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQztnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQVc7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQztnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLGlCQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBaUIsRUFBRSxPQUFlLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQzVFLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUM7Z0JBRUQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUd6RCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBRTlCLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxLQUFjLENBQUMsQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDZCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDMUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO3dCQUV2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7b0JBQ25GLENBQUMsQ0FBQyxDQUFDO29CQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBUSxFQUFFLFNBQWtCLEVBQUUsRUFBRTt3QkFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO29CQUNwRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO3dCQUUzQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBOUZELGtEQThGQyJ9