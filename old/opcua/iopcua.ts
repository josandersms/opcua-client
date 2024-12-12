import { Device, Tag } from '.';
import { IOpcUaAdapter } from './adapters';

export interface IPLC {
    adapter: IOpcUaAdapter;
    address: string;
    device?: Device;
    internalName?: string;
    name: string;
    scanRate?: number;
    slot?: number;
    tagMapping: Tag[];
    type: string;
}