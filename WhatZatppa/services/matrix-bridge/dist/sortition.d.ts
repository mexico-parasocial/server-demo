/**
 * Sortition (random assignment) logic for bi-cameral deliberation.
 *
 * Two modes:
 *   A) Deterministic — djb2Hash(did + communityUri). Fast, reproducible, but
 *      theoretically predictable if you know the inputs.
 *   B) Verifiable — uses drand beacon + SHA-256. Cryptographically secure,
 *      publicly verifiable, and transparent.
 *
 * For production, Verifiable Sortition is recommended.
 */
import { type SortitionProof } from './drand.js';
export declare function assignChamber(did: string, communityUri: string): 'A' | 'B';
export declare function assignChamberBalanced(did: string, communityUri: string, countA: number, countB: number): 'A' | 'B';
/**
 * Verifiable sortition using drand.
 * Fetches a beacon and returns chamber assignment + cryptographic proof.
 */
export declare function assignChamberVerifiable(did: string, communityUri: string, countA: number, countB: number): Promise<SortitionProof & {
    chamber: 'A' | 'B';
}>;
/**
 * Synchronous verifiable sortition when you already have the beacon.
 */
export declare function assignChamberWithBeacon(did: string, communityUri: string, beacon: {
    round: number;
    randomness: string;
}, countA: number, countB: number): SortitionProof & {
    chamber: 'A' | 'B';
};
//# sourceMappingURL=sortition.d.ts.map