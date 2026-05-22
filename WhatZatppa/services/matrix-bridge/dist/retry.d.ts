import type { Logger } from 'pino';
import type { BridgeDatabase } from './db.js';
import type { MatrixAdminClient } from './matrix.js';
import type { BridgeMetrics } from './metrics.js';
export declare class RetryWorker {
    private db;
    private matrix;
    private metrics;
    private log;
    private timer;
    private running;
    constructor(db: BridgeDatabase, matrix: MatrixAdminClient, metrics: BridgeMetrics, log: Logger);
    start(): void;
    stop(): void;
    private run;
}
//# sourceMappingURL=retry.d.ts.map