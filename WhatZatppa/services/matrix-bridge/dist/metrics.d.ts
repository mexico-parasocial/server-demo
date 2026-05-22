import { Counter, Gauge, Histogram, Registry } from 'prom-client';
export declare class BridgeMetrics {
    readonly registry: Registry<"text/plain; version=0.0.4; charset=utf-8">;
    readonly invitesTotal: Counter<"community_uri" | "status">;
    readonly kicksTotal: Counter<"community_uri" | "status">;
    readonly spacesCreatedTotal: Counter<"status">;
    readonly syncLatency: Histogram<"event_type">;
    readonly firehoseLag: Gauge<string>;
    readonly retryAttemptsTotal: Counter<"status" | "event_type">;
    readonly activeUsers: Gauge<string>;
    readonly activeSpaces: Gauge<string>;
    readonly sortitionDrandTotal: Counter<string>;
    readonly sortitionFallbackTotal: Counter<string>;
    readonly drandLatency: Histogram<string>;
}
//# sourceMappingURL=metrics.d.ts.map