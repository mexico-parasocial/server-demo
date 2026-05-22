/**
 * Proof of Participation (PoP) — Civic Reputation Engine
 *
 * Every civic action in PARA generates a "stamp" — a verifiable record
 * of participation. Stamps are non-transferable, non-speculative, and
 * accumulate into a "Civic Score" that reflects genuine engagement.
 *
 * Stamp types:
 *   - 'deliberation' — participated in a chamber discussion
 *   - 'vote' — cast a vote in a community decision
 *   - 'proposal' — authored a proposal that reached quorum
 *   - 'moderation' — served as a community moderator
 *   - 'sortition' — was selected for chamber assignment (passive civic duty)
 *   - 'bridge' — first Matrix login / chat participation
 *
 * Unlike "followers" or "likes", Civic Score is:
 *   - Non-gamifiable (stamps require on-chain community events)
 *   - Privacy-preserving (DID only, no PII)
 *   - Interoperable (standard AT Protocol records)
 *   - Transparent (anyone can audit the stamp ledger)
 */
import type { BridgeDatabase } from './db.js';
import type { Logger } from 'pino';
export type StampType = 'deliberation' | 'vote' | 'proposal' | 'moderation' | 'sortition' | 'bridge';
export interface CivicStamp {
    did: string;
    type: StampType;
    community_uri: string;
    round: number | null;
    weight: number;
    memo: string | null;
    created_at: string;
}
export interface CivicScore {
    did: string;
    totalScore: number;
    stampCount: number;
    byType: Record<StampType, number>;
    communities: string[];
    tier: 'observer' | 'participant' | 'stakeholder' | 'elder';
}
export declare class CivicReputationEngine {
    private db;
    private log;
    constructor(db: BridgeDatabase, log: Logger);
    /**
     * Issue a stamp for a civic action.
     */
    issueStamp(did: string, type: StampType, communityUri: string, opts?: {
        round?: number;
        memo?: string;
    }): void;
    /**
     * Compute cumulative civic score for a DID.
     */
    getScore(did: string): CivicScore;
    /**
     * Get leaderboard for a community (top participants).
     */
    getCommunityLeaderboard(communityUri: string, limit?: number): Array<{
        did: string;
        score: number;
    }>;
    /**
     * Get global leaderboard across all communities.
     */
    getGlobalLeaderboard(limit?: number): Array<{
        did: string;
        score: number;
    }>;
}
//# sourceMappingURL=civic.d.ts.map