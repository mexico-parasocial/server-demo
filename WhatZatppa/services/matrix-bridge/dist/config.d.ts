export interface Config {
    pdsFirehoseUrl: string;
    matrixHomeserverUrl: string;
    matrixAdminToken: string;
    m8BaseUrl: string;
    pushGatewayUrl: string;
    dbPath: string;
    databaseUrl?: string;
    logLevel: string;
    port: number;
    openaiApiKey?: string;
    openaiModel?: string;
}
export declare function loadConfig(): Config;
//# sourceMappingURL=config.d.ts.map