import architectureNotesJson from "../fixtures/architecture/current.json";
import planMilestonesJson from "../fixtures/plan/current.json";
import actorDefsJson from "../fixtures/schemas/com.para.actor.defs.json";
import actorGetProfileStatsJson from "../fixtures/schemas/com.para.actor.getProfileStats.json";
import civicDefsJson from "../fixtures/schemas/com.para.civic.defs.json";
import civicGetCabildeoJson from "../fixtures/schemas/com.para.civic.getCabildeo.json";
import civicListCabildeosJson from "../fixtures/schemas/com.para.civic.listCabildeos.json";
import communityDefsJson from "../fixtures/schemas/com.para.community.defs.json";
import communityGetGovernanceJson from "../fixtures/schemas/com.para.community.getGovernance.json";
import highlightDefsJson from "../fixtures/schemas/com.para.highlight.defs.json";
import highlightListHighlightsJson from "../fixtures/schemas/com.para.highlight.listHighlights.json";
import postJson from "../fixtures/schemas/com.para.post.json";
import socialPostMetaJson from "../fixtures/schemas/com.para.social.postMeta.json";
import statusJson from "../fixtures/schemas/com.para.status.json";
import identityDefsJson from "../fixtures/schemas/com.para.identity.defs.json";
import identityGrantJson from "../fixtures/schemas/com.para.identity.grant.json";
import identityProofJson from "../fixtures/schemas/com.para.identity.proof.json";
import schemaIndexJson from "../fixtures/schemas/index.json";
import { z } from "zod";

export const schemaStatusSchema = z.enum(["draft", "experimental", "stable"]);

export const fieldDefinitionSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  description: z.string(),
});

export const schemaIndexEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  status: schemaStatusSchema,
  tags: z.array(z.string()),
});

export const schemaDocumentSchema = schemaIndexEntrySchema.extend({
  backendOwner: z.string().optional(),
  sourcePath: z.string().optional(),
  examples: z.array(z.string()).optional(),
  relationships: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
  lifecycle: z.array(z.string()).optional(),
  writers: z.array(z.string()).optional(),
  readers: z.array(z.string()).optional(),
  routes: z.array(z.string()).optional(),
  xrpcMethods: z.array(z.string()).optional(),
  indexing: z.array(z.string()).optional(),
  moderation: z.array(z.string()).optional(),
  productSurfaces: z.array(z.string()).optional(),
  fields: z.array(fieldDefinitionSchema),
});

export const architectureNoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  status: z.enum(["active", "planned", "deprecated"]),
});

export const planMilestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  target: z.string(),
});

export type FieldDefinition = z.infer<typeof fieldDefinitionSchema>;
export type SchemaIndexEntry = z.infer<typeof schemaIndexEntrySchema>;
export type SchemaDocument = z.infer<typeof schemaDocumentSchema>;
export type ArchitectureNote = z.infer<typeof architectureNoteSchema>;
export type PlanMilestone = z.infer<typeof planMilestoneSchema>;

const schemaDocuments = [
  postJson,
  communityDefsJson,
  actorDefsJson,
  actorGetProfileStatsJson,
  civicDefsJson,
  civicGetCabildeoJson,
  civicListCabildeosJson,
  communityGetGovernanceJson,
  highlightDefsJson,
  highlightListHighlightsJson,
  socialPostMetaJson,
  statusJson,
  identityDefsJson,
  identityGrantJson,
  identityProofJson,
].map((schema) => schemaDocumentSchema.parse(schema));

export function getSchemaIndex(): SchemaIndexEntry[] {
  return z.array(schemaIndexEntrySchema).parse(schemaIndexJson);
}

export function getSchemaDocuments(): SchemaDocument[] {
  return schemaDocuments;
}

export function getSchemaDocument(
  schemaId: string,
): SchemaDocument | undefined {
  return schemaDocuments.find((schema) => schema.id === schemaId);
}

export function getArchitectureNotes(): ArchitectureNote[] {
  return z.array(architectureNoteSchema).parse(architectureNotesJson);
}

export function getPlanMilestones(): PlanMilestone[] {
  return z.array(planMilestoneSchema).parse(planMilestonesJson);
}
