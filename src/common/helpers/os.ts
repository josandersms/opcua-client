import os from 'os';

export const availableMemory = () => {
    // var value = process.memoryUsage().heapUsed / 1000000;
    const percentageMemUsed = os.freemem() / os.totalmem() * 100.0;
    return percentageMemUsed;
}