"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcUaAdapter = void 0;
class OpcUaAdapter {
    PLC;
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
}
exports.OpcUaAdapter = OpcUaAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjdWEuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vb3BjdWEvYWRhcHRlcnMvb3BjdWEuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFlBQVk7SUFDYixHQUFHLENBQU07SUFDVixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLEtBQUssQ0FBZTtJQUUzQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQztnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBR0o7QUFoQkQsb0NBZ0JDIn0=