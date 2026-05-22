/**
 * Proposal Lifecycle Engine — Constitution as Code in action
 *
 * Every proposal goes through a state machine:
 *   deliberating → voting → [approved | rejected | tied | quorum_not_met]
 *
 * Rules are read from the community's constitution record.
 * This is where abstract governance becomes executable policy.
 */
import type { Logger } from 'pino';
import type { ChatModerationEngine } from './chat-moderation.js';
import type { BridgeDatabase } from './db.js';
import type { MatrixAdminClient } from './matrix.js';
export type ProposalState = 'deliberating' | 'voting' | 'approved' | 'rejected' | 'tied' | 'quorum_not_met';
export declare class ProposalEngine {
    private db;
    private matrix;
    private chatMod;
    private log;
    constructor(db: BridgeDatabase, matrix: MatrixAdminClient, log: Logger, chatMod: ChatModerationEngine);
    /**
     * Called when a new proposal is seen on the firehose.
     */
    onProposalCreated(uri: string, communityUri: string, authorDid: string, title: string, body: string, proposalType: string, budgetRequest: number | null, createdAt: string): void;
    /**
     * Called when a vote is seen on the firehose.
     */
    onVoteCast(uri: string, proposalUri: string, communityUri: string, voterDid: string, choice: string, createdAt: string): void;
    /**
     * Run state transitions. Called periodically by a cron worker.
     * This is where the constitution is actually enforced.
     */
    processStateTransitions(): Promise<void>;
    private getEligibleVoterCount;
    private announceInMatrix;
}
//# sourceMappingURL=proposals.d.ts.map