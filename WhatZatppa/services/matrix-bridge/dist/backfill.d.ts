#!/usr/bin/env node
/**
 * Backfill script: sync all existing PARA communities and memberships to Matrix.
 *
 * Usage:
 *   npx tsx src/backfill.ts --communities-file ./communities.json
 *   npx tsx src/backfill.ts --appview https://api.para.social --community-uri at://did:plc:xxx/com.para.community.board/xxx
 *
 * The communities.json format:
 *   [
 *     {
 *       "uri": "at://did:plc:abc/com.para.community.board/my-community",
 *       "name": "My Community",
 *       "slug": "my-community",
 *       "chamberMode": "bicameral",
 *       "creatorDid": "did:plc:abc"
 *     }
 *   ]
 */
export {};
//# sourceMappingURL=backfill.d.ts.map