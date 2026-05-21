// @ts-nocheck
import { Selectable } from 'kysely'
import { CID } from 'multiformats/cid'
import { AtUri, normalizeDatetimeAlways } from '@atproto/syntax'
import { BackgroundQueue } from '../../background.js'
import { Database } from '../../db/index.js'
import { DatabaseSchema, DatabaseSchemaType } from '../../db/database-schema.js'
import { RecordProcessor } from '../processor.js'

interface OpenQuestionVoteRecord {
  subject: string
  value: number
  createdAt: string
}

type ParaOpenQuestionVote = Selectable<
  DatabaseSchemaType['para_open_question_vote']
>

const lexId = 'com.para.civic.openQuestionVote'

const insertFn = async (
  db: DatabaseSchema,
  uri: AtUri,
  cid: CID,
  obj: OpenQuestionVoteRecord,
  timestamp: string,
): Promise<ParaOpenQuestionVote | null> => {
  if (!Number.isInteger(obj.value) || obj.value < -1 || obj.value > 1) {
    return null
  }

  const row = {
    uri: uri.toString(),
    cid: cid.toString(),
    creator: uri.host,
    subject: obj.subject,
    value: obj.value,
    createdAt: normalizeDatetimeAlways(obj.createdAt),
    indexedAt: timestamp,
  }

  const inserted = await db
    .insertInto('para_open_question_vote')
    .values(row)
    .onConflict((oc) =>
      oc.columns(['creator', 'subject']).doUpdateSet({
        uri: row.uri,
        cid: row.cid,
        value: row.value,
        createdAt: row.createdAt,
        indexedAt: row.indexedAt,
      }),
    )
    .returningAll()
    .executeTakeFirst()

  return inserted ?? null
}

const findDuplicate = async (): Promise<AtUri | null> => {
  return null
}

const notifsForInsert = () => []

const deleteFn = async (
  db: DatabaseSchema,
  uri: AtUri,
): Promise<ParaOpenQuestionVote | null> => {
  const deleted = await db
    .deleteFrom('para_open_question_vote')
    .where('uri', '=', uri.toString())
    .returningAll()
    .executeTakeFirst()

  return deleted ?? null
}

const notifsForDelete = () => ({ notifs: [], toDelete: [] })

export type PluginType = RecordProcessor<
  OpenQuestionVoteRecord,
  ParaOpenQuestionVote
>

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
