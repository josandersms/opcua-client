import fs from 'node:fs/promises';
import jsonpath from 'jsonpath';

export class ConfigurationService {
    private static _instance: ConfigurationService;
    private static configuration: any;

    private constructor() {
        // Private constructor, singleton
    }

    public static async getInstance(file?: string): Promise<ConfigurationService> {
        if (!this._instance) {
            this._instance = new ConfigurationService();
            await this._instance.loadConfiguration(file);
        }
        return this._instance;
    }

    public static get instance(): ConfigurationService {
        return ConfigurationService._instance;
    }

    private async loadConfiguration(file?: string): Promise<void> {
        try {
            let data: any;
            if (!file) {
                data = process.env['OPCUA_CONFIGURATION'];
            } else {
                data = (await fs.readFile(file, { encoding: 'utf-8' })).toString();
            }
            ConfigurationService.configuration = JSON.parse(data);
        } catch (error) {
            console.error(error);
        }
    }

    public static getConfiguration(): any {
        return ConfigurationService.configuration;
    }

    public queryConfiguration(pathExpression: string, count?: number): any {
        return jsonpath.query(ConfigurationService.configuration, pathExpression, count);        
    }
}