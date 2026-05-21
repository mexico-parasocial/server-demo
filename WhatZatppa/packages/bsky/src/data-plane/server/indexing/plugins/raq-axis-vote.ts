// @ts-nocheck
import { Selectable } from 'kysely'
import { CID } from 'multiformats/cid'
import { AtUri, normalizeDatetimeAlways } from '@atproto/syntax'
import { BackgroundQueue } from '../../background.js'
import { Database } from '../../db/index.js'
import { DatabaseSchema, DatabaseSchemaType } from '../../db/database-schema.js'
import { RecordProcessor } from '../processor.js'

interface AxisVoteRecord {
  axisId: string
  value?: number
  createdAt: string
}

type AxisVote = Selectable<DatabaseSchemaType['raq_axis_vote']>
type IndexedAxisVote = {
  record: AxisVote
}

const lexId = 'com.para.raq.axisVote'

const insertFn = async (
  db: DatabaseSchema,
  uri: AtUri,
  cid: CID,
  obj: AxisVoteRecord,
  timestamp: string,
): Promise<IndexedAxisVote | null> => {
  const inserted = await db
    .insertInto('raq_axis_vote')
    .values({
      uri: uri.toString(),
      cid: cid.toString(),
      creator: uri.host,
      axisId: obj.axisId,
      value: obj.value ?? 0,
      createdAt: normalizeDatetimeAlways(obj.createdAt),
      indexedAt: timestamp,
    })
    .onConflict((oc) =>
      oc.doUpdateSet({
        cid: cid.toString(),
        axisId: obj.axisId,
        value: obj.value ?? 0,
        createdAt: normalizeDatetimeAlways(obj.createdAt),
        indexedAt: timestamp,
      }),
    )
    .returningAll()
    .executeTakeFirst()

  if (!inserted) return null
  return { record: inserted }
}

const findDuplicate = async (): Promise<AtUri | null> => {
  return null
}

const deleteFn = async (
  db: DatabaseSchema,
  uri: AtUri,
): Promise<IndexedAxisVote | null> => {
  const deleted = await db
    .deleteFrom('raq_axis_vote')
    .where('uri', '=', uri.toString())
    .returningAll()
    .executeTakeFirst()

  return deleted ? { record: deleted } : null
}

const notifsForInsert = () => {
  return []
}

const notifsForDelete = (
  deleted: IndexedAxisVote,
  _replacedBy: IndexedAxisVote | null,
) => {
  return { notifs: [], toDelete: [deleted.record.uri] }
}

export type PluginType = RecordProcessor<AxisVoteRecord, IndexedAxisVote>

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

export default makePlugin
