import type { Logger } from 'pino';
import type { Config } from './config.js';
import type { BridgeDatabase } from './db.js';
import type { MatrixAdminClient } from './matrix.js';
import type { BridgeMetrics } from './metrics.js';
export declare class FirehoseConsumer {
    private firehose;
    private db;
    private matrix;
    private metrics;
    private proposals;
    private chatMod;
    private log;
    private serverName;
    private lastSeq;
    private cursorSaveTimer;
    constructor(config: Config, db: BridgeDatabase, matrix: MatrixAdminClient, metrics: BridgeMetrics, log: Logger);
    start(): Promise<void>;
    stop(): void;
    private handleEvent;
    private handleCommit;
    private handleCommunityCreate;
    private handleMembershipChange;
    private handleBicameralInvite;
    private handleConstitutionUpdate;
    private handleProposalCreate;
    private handleVoteCast;
    private handleObserverInvite;
    private kickFromAllRooms;
    private ensureUserExists;
    private ensureMxid;
}
//# sourceMappingURL=firehose.d.ts.map