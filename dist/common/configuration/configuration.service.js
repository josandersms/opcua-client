"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const jsonpath_1 = tslib_1.__importDefault(require("jsonpath"));
class ConfigurationService {
    static _instance;
    static configuration;
    constructor() {
    }
    static async getInstance(file) {
        if (!this._instance) {
            this._instance = new ConfigurationService();
            await this._instance.loadConfiguration(file);
        }
        return this._instance;
    }
    static get instance() {
        return ConfigurationService._instance;
    }
    async loadConfiguration(file) {
        try {
            let data;
            if (!file) {
                data = process.env['OPCUA_CONFIGURATION'];
            }
            else {
                data = (await promises_1.default.readFile(file, { encoding: 'utf-8' })).toString();
            }
            ConfigurationService.configuration = JSON.parse(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    static getConfiguration() {
        return ConfigurationService.configuration;
    }
    queryConfiguration(pathExpression, count) {
        return jsonpath_1.default.query(ConfigurationService.configuration, pathExpression, count);
    }
}
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsd0VBQWtDO0FBQ2xDLGdFQUFnQztBQUVoQyxNQUFhLG9CQUFvQjtJQUNyQixNQUFNLENBQUMsU0FBUyxDQUF1QjtJQUN2QyxNQUFNLENBQUMsYUFBYSxDQUFNO0lBRWxDO0lBRUEsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQWE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUM1QyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxLQUFLLFFBQVE7UUFDdEIsT0FBTyxvQkFBb0IsQ0FBQyxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFhO1FBQ3pDLElBQUksQ0FBQztZQUNELElBQUksSUFBUyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNSLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUMsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLElBQUksR0FBRyxDQUFDLE1BQU0sa0JBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RSxDQUFDO1lBQ0Qsb0JBQW9CLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLGdCQUFnQjtRQUMxQixPQUFPLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztJQUM5QyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsY0FBc0IsRUFBRSxLQUFjO1FBQzVELE9BQU8sa0JBQVEsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0o7QUF6Q0Qsb0RBeUNDIn0=