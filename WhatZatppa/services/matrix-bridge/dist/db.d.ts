import type { Config } from './config.js';
export interface CommunitySpaceMap {
    communityUri: string;
    spaceId: string;
    slug: string;
    chamberMode: string;
    chamberA_RoomId: string | null;
    chamberB_RoomId: string | null;
    observerRoomId: string | null;
    createdAt: string;
}
export interface UserMatrixMap {
    did: string;
    matrixUserId: string;
    password: string;
}
export interface UserPushToken {
    did: string;
    expoPushToken: string;
    platform: string;
    updatedAt: string;
}
export interface SyncLogEntry {
    id: number;
    eventType: string;
    communityUri: string;
    did: string | null;
    spaceId: string | null;
    success: number;
    retryCount: number;
    error: string | null;
    createdAt: string;
}
export declare class BridgeDatabase {
    private db;
    constructor(config: Config);
    private mapCommunitySpace;
    private init;
    getSpaceForCommunity(communityUri: string): CommunitySpaceMap | undefined;
    setSpaceForCommunity(communityUri: string, spaceId: string, slug: string, chamberMode?: string): void;
    setChamberRooms(communityUri: string, chamberA: string | null, chamberB: string | null, observerRoom: string | null): void;
    getChamberAssignment(communityUri: string, did: string): string | undefined;
    setChamberAssignment(communityUri: string, did: string, chamber: string): void;
    getChamberMemberCount(communityUri: string, chamber: string): number;
    getMxidForDid(did: string): string | undefined;
    setMxidForDid(did: string, mxid: string, password: string): void;
    getUserPassword(did: string): string | undefined;
    setCommunityMembership(did: string, communityUri: string, membershipState: string, roles?: string[]): void;
    isActiveCommunityMember(did: string, communityUri: string): boolean;
    getActiveCommunityRoomsForDid(did: string): {
        roomId: string;
        communityUri: string;
        slug: string;
    }[];
    logSync(eventType: string, communityUri: string, did: string | null, spaceId: string | null, success: boolean, error?: string): void;
    getFailedSyncs(limit?: number): SyncLogEntry[];
    getRetryCount(entryId: number): number;
    incrementRetryCount(entryId: number): void;
    markSyncSuccess(entryId: number): void;
    getSyncCursor(): number | undefined;
    setSyncCursor(cursor: number): void;
    getUserCount(): number;
    getSpaceCount(): number;
    setPushToken(did: string, expoPushToken: string, platform: string): void;
    getPushToken(did: string): UserPushToken | undefined;
    getPushTokensByDid(dids: string[]): UserPushToken[];
    getCommunityByRoomId(roomId: string): {
        communityUri: string;
        slug: string;
    } | undefined;
    getDidForMxid(mxid: string): string | undefined;
    setConstitution(communityUri: string, version: number, rulesJson: string): void;
    getConstitution(communityUri: string): {
        communityUri: string;
        version: number;
        rulesJson: string;
        createdAt: string;
    } | undefined;
    insertProposal(uri: string, communityUri: string, authorDid: string, title: string, body: string, proposalType: string, budgetRequest: number | null, createdAt: string): void;
    getProposal(uri: string): any | undefined;
    getProposalsByCommunity(communityUri: string, state?: string): any[];
    getProposalsByState(state: string): any[];
    updateProposalState(uri: string, state: string, votingStartsAt?: string, votingEndsAt?: string): void;
    updateProposalVoteCounts(uri: string, forVotes: number, againstVotes: number, abstainVotes: number): void;
    finalizeProposal(uri: string, result: string, decidedAt: string): void;
    insertVote(uri: string, proposalUri: string, communityUri: string, voterDid: string, choice: string, weight: number, createdAt: string): void;
    getVotesForProposal(proposalUri: string): any[];
    insertDecision(proposalUri: string, communityUri: string, result: string, votesFor: number, votesAgainst: number, votesAbstain: number, totalMembers: number | null, quorumRequired: number, thresholdRequired: number, constitutionVersion: number, budgetAllocated: number | null, createdAt: string): void;
    getDecision(proposalUri: string): any | undefined;
    getDecisionsByCommunity(communityUri: string): any[];
    saveSortitionProof(proof: {
        did: string;
        communityUri: string;
        chamber: 'A' | 'B';
        drandRound: number;
        drandRandomness: string;
        hashInput: string;
        hashOutput: string;
        threshold: number;
        timestamp: string;
    }): void;
    getSortitionProof(did: string, communityUri: string): any | undefined;
    getSortitionProofsByCommunity(communityUri: string): any[];
    getUnverifiedProofs(limit?: number): any[];
    markProofVerified(id: number): void;
    getSortitionProofCount(): number;
    createSortitionRun(run: {
        id: string;
        cabildeoUri: string;
        communityUri: string;
        createdByDid: string;
        assemblySize: number;
        eligibilityFilter: string;
        drandRound: number;
        configRecordJson: string;
        createdAt: string;
    }): any;
    getSortitionRun(id: string): any | undefined;
    getSortitionRunByCabildeo(cabildeoUri: string): any | undefined;
    getScheduledSortitionRuns(limit?: number): any[];
    replaceSortitionCandidates(runId: string, candidates: Array<{
        did: string;
        communityUri: string;
        cabildeoUri: string;
        hashInput: string;
        hashOutput: string;
        hashValue: number;
        threshold: number;
        selected: boolean;
        createdAt: string;
    }>): void;
    activateSortitionRun(run: {
        id: string;
        drandRandomness: string;
        threshold: number;
        eligibleCount: number;
        selectedCount: number;
        processedAt: string;
    }): any | undefined;
    failSortitionRun(id: string): void;
    getSortitionCandidates(runId: string, selectedOnly?: boolean): any[];
    getSortitionCandidate(runId: string, did: string): any | undefined;
    insertModerationEvent(event: {
        did: string;
        communityUri: string;
        eventType: string;
        reporterDid?: string | null;
        reportReason?: string | null;
        reportedEventId?: string | null;
        reportedMessagePreview?: string | null;
        sanctionType?: string | null;
        sanctionDurationMinutes?: number | null;
        sanctionedByDid?: string | null;
        matrixRoomId?: string | null;
    }): void;
    getModerationEvents(did: string, communityUri: string, sinceDays?: number): any[];
    getRecentReportsForCommunity(communityUri: string, days?: number): any[];
    getActiveSanctions(did: string, communityUri: string): any[];
    getParticipationStats(did: string, communityUri: string): any | undefined;
    ensureParticipationStats(did: string, communityUri: string, matrixRoomId?: string): void;
    incrementMessageCount(did: string, communityUri: string): void;
    incrementVoteCount(did: string, communityUri: string): void;
    incrementProposalCount(did: string, communityUri: string): void;
    setParticipationRoles(did: string, communityUri: string, roles: {
        isDelegate?: boolean;
        isModerator?: boolean;
        chamber?: string | null;
    }): void;
    getParticipationStatsByCommunity(communityUri: string): any[];
    setUserBadge(badge: {
        did: string;
        communityUri: string;
        badgeType: string;
        severity?: string | null;
        visibleInChat?: number;
        expiresAt?: string | null;
    }): void;
    clearUserBadges(did: string, communityUri: string): void;
    getUserBadges(did: string, communityUri: string): any[];
    getCommunityBadgeSummary(communityUri: string): {
        warning: number;
        critical: number;
    };
    getMemberList(communityUri: string, limit?: number, offset?: number): any[];
    expireBadges(): void;
    getChatPreferences(did: string): {
        showChatBadges: boolean;
    };
    setChatPreferences(did: string, showChatBadges: boolean): void;
    insertMatrixEvent(event: {
        roomId: string;
        eventId: string;
        sender: string;
        type: string;
        content?: string | null;
        originServerTs: number;
    }): boolean;
    eventExists(eventId: string): boolean;
    getRecentEvents(roomId: string, limit?: number): any[];
    setReadMarker(did: string, roomId: string, eventId: string): void;
    getUnreadCount(did: string, roomId: string): number;
    getUnreadCountsForDid(did: string): {
        roomId: string;
        communityUri: string;
        slug: string;
        unread: number;
    }[];
    getTotalUnreadForDid(did: string): number;
    getAllRoomIds(): string[];
    insertCard(card: {
        id: string;
        communityUri: string;
        authorDid: string;
        title: string;
        content?: string;
        cardType: string;
        sourceRoomId?: string;
        sourceEventId?: string;
        sourceUrl?: string;
        isPublic?: number;
        passportVisible?: number;
        metadata?: string;
    }): void;
    getCardsForCommunity(communityUri: string, opts?: {
        limit?: number;
        offset?: number;
        cardType?: string;
        authorDid?: string;
    }): any[];
    getCard(id: string): any | undefined;
    getCardCount(communityUri: string): number;
    private mapCommunityContribution;
    insertCommunityMapContribution(contribution: {
        id: string;
        communityUri: string;
        authorDid: string;
        title: string;
        content?: string;
        sourceUrl?: string;
        sourceType: string;
        metadata?: string;
    }): void;
    getCommunityMapContributions(communityUri: string, opts?: {
        status?: string;
        viewerDid?: string;
        limit?: number;
    }): any[];
    getCommunityMapContribution(id: string, viewerDid?: string): any | undefined;
    getCommunityContributionVote(contributionId: string, voterDid: string): {
        vote: string;
    } | undefined;
    getCommunityContributionVoteCounts(contributionId: string): {
        approve: number;
        reject: number;
    };
    voteCommunityMapContribution(contributionId: string, voterDid: string, vote: 'approve' | 'reject'): any;
    getCardsPendingLLMEnrichment(limit?: number): any[];
    markCardEnriched(id: string, model: string): void;
    updateCardVisibility(id: string, isPublic: number, passportVisible: number): void;
    upsertCardVote(cardId: string, voterDid: string, influence: number): void;
    getCardVote(cardId: string, voterDid: string): {
        influence: number;
    } | undefined;
    getCardVotes(cardId: string): Array<{
        voter_did: string;
        influence: number;
    }>;
    getCardInfluenceScores(cardIds: string[]): Map<string, number>;
    getCardVoteStats(cardIds: string[]): Map<string, {
        total: number;
        count: number;
    }>;
    insertRelationship(rel: {
        id: string;
        sourceCardId: string;
        targetCardId: string;
        relationshipType: string;
        authorDid: string;
    }): void;
    getRelationshipsForCard(cardId: string): any[];
    getGraphForCommunity(communityUri: string): {
        nodes: any[];
        edges: any[];
    };
    deleteRelationship(id: string): void;
    insertSuggestedRelationship(sugg: {
        id: string;
        sourceCardId: string;
        targetCardId: string;
        relationshipType: string;
        confidence: number;
        reason: string;
    }): void;
    getSuggestionsForCommunity(communityUri: string, opts?: {
        status?: string;
        limit?: number;
    }): any[];
    acceptSuggestion(id: string, authorDid: string): void;
    rejectSuggestion(id: string): void;
    insertEntity(entity: {
        cardId: string;
        entityType: string;
        entityValue: string;
        startPos?: number;
        endPos?: number;
    }): void;
    getEntitiesForCard(cardId: string): any[];
    getCommunityPulse(communityUri: string, voterDid?: string): {
        stanceDistribution: {
            pro: number;
            con: number;
            neutral: number;
        };
        topEntities: Array<{
            value: string;
            type: string;
            count: number;
        }>;
        trendingClaims: Array<{
            id: string;
            title: string;
            stance: string;
            influence: number;
            voteCount: number;
            cardType: string;
        }>;
        controversialClaims: Array<{
            id: string;
            title: string;
            influence: number;
            voteCount: number;
            cardType: string;
        }>;
        userStats?: {
            votesCast: number;
            proVotes: number;
            conVotes: number;
            neutralVotes: number;
            topAgreedTopic?: string;
            topDisagreedTopic?: string;
        };
    };
    close(): void;
}
//# sourceMappingURL=db.d.ts.map