/**
 * Verifiable Randomness for PARA Sortition
 *
 * Uses drand (https://drand.love) — a decentralized, verifiable randomness beacon.
 * Every 30 seconds, drand emits a beacon that nobody can predict or manipulate.
 *
 * For sortition:
 * 1. We fetch the latest drand round (or a specific round for reproducibility)
 * 2. Combine beacon randomness + DID + communityUri
 * 3. Hash and derive chamber assignment
 * 4. The round number is published on-chain so anyone can verify
 *
 * This replaces deterministic djb2Hash with cryptographically verifiable randomness.
 */
export interface DrandBeacon {
    round: number;
    randomness: string;
    signature?: string;
}
export interface SortitionProof {
    round: number;
    randomness: string;
    did: string;
    communityUri: string;
    chamber: 'A' | 'B';
    hashInput: string;
    hashOutput: string;
    threshold: number;
    timestamp: string;
}
export interface AssemblySortitionHash {
    hashInput: string;
    hashOutput: string;
    hashValue: number;
}
/**
 * Hash one eligible citizen for a concrete Cabildeo assembly.
 *
 * The existing chamber proof uses beacon || did || community. Assembly
 * selection also includes the Cabildeo URI so a proof cannot be reused across
 * separate deliberations inside the same community.
 */
export declare function computeAssemblySortitionHash(did: string, communityUri: string, cabildeoUri: string, beacon: DrandBeacon): AssemblySortitionHash;
/**
 * Fetch the latest beacon from drand Quicknet.
 */
export declare function fetchLatestBeacon(): Promise<DrandBeacon>;
/**
 * Fetch a specific round. Use this for reproducible verification.
 */
export declare function fetchBeacon(round: number): Promise<DrandBeacon>;
/**
 * Deterministic chamber assignment using verifiable randomness.
 *
 * @param did — user's DID
 * @param communityUri — community AT URI
 * @param beacon — drand beacon (round + randomness)
 * @param counts — current chamber sizes for load balancing
 * @returns chamber assignment + proof
 */
export declare function verifiableSortition(did: string, communityUri: string, beacon: DrandBeacon, counts?: {
    a: number;
    b: number;
}): SortitionProof;
/**
 * Verify a sortition proof by re-running the calculation.
 */
export declare function verifySortitionProof(proof: SortitionProof): Promise<boolean>;
//# sourceMappingURL=drand.d.ts.map