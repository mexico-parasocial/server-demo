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
const TIER_THRESHOLDS = {
    observer: 0,
    participant: 10,
    stakeholder: 50,
    elder: 200,
};
const STAMP_WEIGHTS = {
    deliberation: 1.0,
    vote: 2.0,
    proposal: 3.0,
    moderation: 2.5,
    sortition: 0.5,
    bridge: 0.5,
};
export class CivicReputationEngine {
    db;
    log;
    constructor(db, log) {
        this.db = db;
        this.log = log;
    }
    /**
     * Issue a stamp for a civic action.
     */
    issueStamp(did, type, communityUri, opts) {
        const weight = STAMP_WEIGHTS[type];
        this.db.insertCivicStamp({
            did,
            type,
            community_uri: communityUri,
            round: opts?.round ?? null,
            weight,
            memo: opts?.memo ?? null,
            created_at: new Date().toISOString(),
        });
        this.log.debug({ did, type, communityUri, weight }, 'Civic stamp issued');
    }
    /**
     * Compute cumulative civic score for a DID.
     */
    getScore(did) {
        const stamps = this.db.getCivicStampsForDid(did);
        const byType = {};
        let totalScore = 0;
        const communities = new Set();
        for (const s of stamps) {
            byType[s.type] = (byType[s.type] || 0) + s.weight;
            totalScore += s.weight;
            communities.add(s.community_uri);
        }
        let tier = 'observer';
        if (totalScore >= TIER_THRESHOLDS.elder)
            tier = 'elder';
        else if (totalScore >= TIER_THRESHOLDS.stakeholder)
            tier = 'stakeholder';
        else if (totalScore >= TIER_THRESHOLDS.participant)
            tier = 'participant';
        return {
            did,
            totalScore,
            stampCount: stamps.length,
            byType,
            communities: Array.from(communities),
            tier,
        };
    }
    /**
     * Get leaderboard for a community (top participants).
     */
    getCommunityLeaderboard(communityUri, limit = 20) {
        return this.db.getCivicLeaderboard(communityUri, limit);
    }
    /**
     * Get global leaderboard across all communities.
     */
    getGlobalLeaderboard(limit = 50) {
        return this.db.getGlobalCivicLeaderboard(limit);
    }
}
//# sourceMappingURL=civic.js.map