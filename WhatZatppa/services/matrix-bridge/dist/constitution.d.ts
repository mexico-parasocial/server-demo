/**
 * Constitution as Code — Programmable Governance for PARA Communities
 *
 * Each community defines its rules as an AT Protocol record.
 * The bridge reads, validates, and enforces these rules automatically.
 *
 * This transforms governance from "gentlemen's agreements" into
 * executable, auditable, versioned policy.
 */
export interface AutoModerationRules {
    enabled: boolean;
    spamThreshold?: number;
    toxicityThreshold?: number;
}
export interface BudgetRules {
    enabled: boolean;
    matchingPool?: number;
    minContribution?: number;
    roundDurationDays?: number;
}
export interface GovernanceRules {
    quorum?: number;
    approvalThreshold?: number;
    deliberationDays?: number;
    votingDays?: number;
    chamberSize?: number;
    observerSize?: number;
    autoModeration?: AutoModerationRules;
    budget?: BudgetRules;
}
export interface CommunityConstitution {
    community: string;
    version: number;
    rules: GovernanceRules;
    createdAt: string;
}
export declare function parseConstitution(record: any): CommunityConstitution;
export declare function getEffectiveRules(constitution: CommunityConstitution | undefined): GovernanceRules;
/**
 * Check if a proposal can move from deliberation to voting.
 */
export declare function canStartVoting(constitution: CommunityConstitution | undefined, proposalCreatedAt: Date, now?: Date): boolean;
/**
 * Check if a vote result meets the approval threshold.
 */
export declare function isApproved(constitution: CommunityConstitution | undefined, votesFor: number, votesAgainst: number): boolean;
/**
 * Quadratic funding matching calculation.
 * Given a list of contributions, returns the matching amount for each project.
 */
export declare function quadraticMatching(contributions: Array<{
    projectId: string;
    amount: number;
}>, matchingPool: number): Array<{
    projectId: string;
    contributions: number;
    matching: number;
}>;
//# sourceMappingURL=constitution.d.ts.map