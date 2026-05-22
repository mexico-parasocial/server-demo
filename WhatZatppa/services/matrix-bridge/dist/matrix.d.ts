import type { Config } from './config.js';
export interface MatrixRoomMember {
    user_id: string;
    display_name?: string;
    avatar_url?: string;
}
export declare class MatrixAdminClient {
    private baseUrl;
    private adminToken;
    constructor(config: Config);
    private request;
    private encryptedInitialState;
    createSpace(name: string, slug: string): Promise<string>;
    createRoom(name: string, alias: string, parentSpaceId?: string): Promise<string>;
    addChildSpace(parentId: string, childId: string, via: string[]): Promise<void>;
    inviteUser(roomId: string, userId: string): Promise<void>;
    kickUser(roomId: string, userId: string, reason?: string): Promise<void>;
    setPowerLevel(roomId: string, userId: string, level: number): Promise<void>;
    getRoomMembers(roomId: string): Promise<MatrixRoomMember[]>;
    userExists(userId: string): Promise<boolean>;
    createUser(userId: string, displayName: string, password: string): Promise<void>;
    generateUserToken(userId: string): Promise<{
        accessToken: string;
        deviceId: string;
    }>;
    setPusherWithUserToken(mxid: string, userToken: string, pushkey: string, appId: string, gatewayUrl: string): Promise<void>;
    /**
     * Fetch recent messages from a room using Synapse Admin API.
     * Returns {chunk: MatrixEvent[], start: string, end: string}
     */
    getRoomMessages(roomId: string, opts?: {
        from?: string;
        to?: string;
        limit?: number;
        dir?: 'f' | 'b';
    }): Promise<{
        chunk: Array<{
            event_id: string;
            sender: string;
            type: string;
            content: Record<string, unknown>;
            origin_server_ts: number;
        }>;
        start: string;
        end?: string;
    }>;
}
export declare function didToMxid(did: string, serverName: string): string;
export declare function extractServerName(homeserverUrl: string): string;
//# sourceMappingURL=matrix.d.ts.map