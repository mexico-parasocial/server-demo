import AtpAgent from '@atproto/api'
import {
  SeedClient,
  TestNetwork,
  createRaqAssessmentRecord,
  createRaqAxisVoteRecord,
  createRaqProposalRecord,
  usersSeed,
  writeParaFixture,
} from '@atproto/dev-env'

const maybeDescribe = process.env.DB_POSTGRES_URL ? describe : describe.skip

maybeDescribe('RAQ indexing and queries', () => {
  let network: TestNetwork
  let agent: AtpAgent
  let sc: SeedClient
  let db: any

  beforeAll(async () => {
    network = await TestNetwork.create({
      dbPostgresSchema: 'raq_indexing_test',
    })
    agent = network.bsky.getClient()
    sc = network.getSeedClient()
    db = network.bsky.ctx.db
    await usersSeed(sc)
    await network.processAll()
  })

  afterAll(async () => {
    await network.close()
  })

  it('indexes an assessment record into raq_assessment', async () => {
    const assessmentRef = await writeParaFixture(network, async () => {
      return createRaqAssessmentRecord(sc, sc.dids.alice, {
        answers: [
          { questionId: 'q1', value: 2 },
          { questionId: 'q2', value: -1 },
        ],
        results: [
          {
            axisId: 'economy',
            axisTitle: 'Economy',
            score: 65,
            label: 'Planning',
            labelLow: 'Market',
            labelHigh: 'Planning',
            rawScore: 4,
          },
        ],
        compass: { x: -300, y: 200, ninth: 'auth-left' },
        ideology: {
          name: 'Social Democrat',
          description: 'Believes in strong public services.',
          matchPercent: 87,
        },
        isPublic: true,
      })
    })

    const row = await db.db
      .selectFrom('raq_assessment')
      .selectAll()
      .where('uri', '=', assessmentRef.uri)
      .executeTakeFirst()

    expect(row).toBeDefined()
    expect(row?.creator).toBe(sc.dids.alice)
    expect(row?.isPublic).toBe(true)
    expect(row?.completedAt).toBeDefined()
  })

  it('indexes an axis vote record into raq_axis_vote', async () => {
    const voteRef = await writeParaFixture(network, async () => {
      return createRaqAxisVoteRecord(sc, sc.dids.bob, {
        axisId: 'ecology-growth',
        value: 1,
      })
    })

    const row = await db.db
      .selectFrom('raq_axis_vote')
      .selectAll()
      .where('uri', '=', voteRef.uri)
      .executeTakeFirst()

    expect(row).toBeDefined()
    expect(row?.creator).toBe(sc.dids.bob)
    expect(row?.axisId).toBe('ecology-growth')
    expect(row?.value).toBe(1)
  })

  it('indexes a proposal record into raq_proposal', async () => {
    const proposalRef = await writeParaFixture(network, async () => {
      return createRaqProposalRecord(sc, sc.dids.carla, {
        text: 'Should public transportation be free?',
        targetCommunity: 'jalisco',
      })
    })

    const row = await db.db
      .selectFrom('raq_proposal')
      .selectAll()
      .where('uri', '=', proposalRef.uri)
      .executeTakeFirst()

    expect(row).toBeDefined()
    expect(row?.creator).toBe(sc.dids.carla)
    expect(row?.text).toBe('Should public transportation be free?')
    expect(row?.targetCommunity).toBe('jalisco')
  })

  it('returns user alignment via getUserAlignment', async () => {
    const res = await agent.call('com.para.raq.getUserAlignment', {
      did: sc.dids.alice,
    })

    expect(res.data.assessment).toBeDefined()
    expect(res.data.assessment.results.length).toBeGreaterThan(0)
    expect(res.data.assessment.compass).toBeDefined()
    expect(res.data.assessment.ideology).toBeDefined()
  })

  it('returns empty alignment for user without public assessment', async () => {
    // Create a private assessment
    await writeParaFixture(network, async () => {
      return createRaqAssessmentRecord(sc, sc.dids.bob, {
        answers: [{ questionId: 'q1', value: 0 }],
        results: [
          {
            axisId: 'test',
            axisTitle: 'Test',
            score: 50,
            label: 'Neutral',
            labelLow: 'Low',
            labelHigh: 'High',
            rawScore: 0,
          },
        ],
        compass: { x: 0, y: 0, ninth: 'center' },
        ideology: {
          name: 'Centrist',
          description: 'Neutral.',
          matchPercent: 50,
        },
        isPublic: false,
      })
    })

    await expect(
      agent.call('com.para.raq.getUserAlignment', { did: sc.dids.bob }),
    ).rejects.toThrow()
  })
})
