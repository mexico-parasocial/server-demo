// @ts-nocheck
import { Selectable } from 'kysely'
import { CID } from 'multiformats/cid'
import { AtUri, normalizeDatetimeAlways } from '@atproto/syntax'
import { BackgroundQueue } from '../../background.js'
import { Database } from '../../db/index.js'
import { DatabaseSchema, DatabaseSchemaType } from '../../db/database-schema.js'
import { RecordProcessor } from '../processor.js'

interface VoteRecord {
  proposal: string
  community: string
  voter: string
  signal: number
  createdAt: string
}

type ParaQvldVote = Selectable<DatabaseSchemaType['para_qvld_vote']>

const lexId = 'com.para.community.vote'

const insertFn = async (
  db: DatabaseSchema,
  uri: AtUri,
  cid: CID,
  obj: VoteRecord,
  timestamp: string,
): Promise<ParaQvldVote | null> => {
  const inserted = await db
    .insertInto('para_qvld_vote')
    .values({
      uri: uri.toString(),
      cid: cid.toString(),
      creator: uri.host,
      proposal: obj.proposal,
      community: obj.community,
      signal: obj.signal,
      createdAt: normalizeDatetimeAlways(obj.createdAt),
      indexedAt: timestamp,
    })
    .onConflict((oc) =>
      oc.columns(['creator', 'proposal']).doUpdateSet({
        uri: uri.toString(),
        cid: cid.toString(),
        signal: obj.signal,
        createdAt: normalizeDatetimeAlways(obj.createdAt),
        indexedAt: timestamp,
      }),
    )
    .returningAll()
    .executeTakeFirst()

  return inserted ?? null
}

const findDuplicate = async (): Promise<AtUri | null> => null

const notifsForInsert = () => []

const deleteFn = async (
  db: DatabaseSchema,
  uri: AtUri,
): Promise<ParaQvldVote | null> => {
  const deleted = await db
    .deleteFrom('para_qvld_vote')
    .where('uri', '=', uri.toString())
    .returningAll()
    .executeTakeFirst()
  return deleted ?? null
}

const notifsForDelete = (deleted: ParaQvldVote) => {
  return { notifs: [], toDelete: [deleted.uri] }
}

export type PluginType = RecordProcessor<VoteRecord, ParaQvldVote>

export const makePlugin = (
  db: Database,
  background: BackgroundQueue,
): PluginType => {
  return new RecordProcessor(db, background, {
    lexId,
    insertFn,
    findDuplicate,
    deleteFn,
    notifsForInsert,
    notifsForDelete,
  })
}
