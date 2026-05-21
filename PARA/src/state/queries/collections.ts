import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {useAgent} from '#/state/session'
import {
  type CivicTreeItem,
  type CivicTreeRelation,
  getCivicTreeItemKey,
} from './collection-items'

export type {
  CivicTreeItem,
  CivicTreeRelation,
} from './collection-items'
export {
  createCivicTreeItemId,
  createCivicTreeRelationId,
  getCivicTreeItemKey,
  getCivicTreeItemKind,
  getCivicTreeItemTitle,
} from './collection-items'

const STALE_TIME = 60 * 1000 // 1 minute
const RQKEY_ROOT = 'collections'

export interface CivicTreeCollection {
  id: string
  name: string
  description?: string
  color?: string
  items: CivicTreeItem[]
  relations?: CivicTreeRelation[]
  createdAt: string
  updatedAt: string
}

export function useCollectionsQuery() {
  const agent = useAgent()
  return useQuery<CivicTreeCollection[]>({
    queryKey: [RQKEY_ROOT, 'list'],
    queryFn: async () => {
      const res = await agent.call('com.para.collection.listCollections', {})
      return (res.data.collections || []) as CivicTreeCollection[]
    },
    staleTime: STALE_TIME,
  })
}

export function useCollectionQuery(id: string | undefined) {
  const agent = useAgent()
  return useQuery<CivicTreeCollection>({
    queryKey: [RQKEY_ROOT, 'get', id],
    queryFn: async () => {
      if (!id) throw new Error('No collection id')
      const res = await agent.call('com.para.collection.getCollection', {
        id,
      })
      return res.data.collection as CivicTreeCollection
    },
    enabled: !!id,
    staleTime: STALE_TIME,
  })
}

export function useCreateCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    {id: string},
    Error,
    {name: string; description?: string; color?: string}
  >({
    mutationFn: async input => {
      const res = await agent.call(
        'com.para.collection.createCollection',
        undefined,
        input,
      )
      return res.data as {id: string}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
    },
  })
}

export function useUpdateCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    void,
    Error,
    {id: string; collection: CivicTreeCollectionInput}
  >(
    {
      mutationFn: async input => {
        await agent.call(
          'com.para.collection.updateCollection',
          undefined,
          input,
        )
      },
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
        queryClient.invalidateQueries({
          queryKey: [RQKEY_ROOT, 'get', variables.id],
        })
      },
    },
  )
}

export function useDeleteCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<void, Error, {id: string}>({
    mutationFn: async input => {
      await agent.call(
        'com.para.collection.deleteCollection',
        undefined,
        input,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
    },
  })
}

export function useDuplicateCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    {id: string},
    Error,
    {sourceId: string; newName: string}
  >({
    mutationFn: async input => {
      const {sourceId, newName} = input
      const {data} = await agent.call('com.para.collection.getCollection', {
        id: sourceId,
      })
      const source = data.collection
      if (!source) throw new Error('Source collection not found')
      const res = await agent.call(
        'com.para.collection.createCollection',
        undefined,
        {
          name: newName,
          description: source.description,
          color: source.color,
        },
      )
      const newId = (res.data as {id: string}).id
      if (source.items.length > 0 || (source.relations || []).length > 0) {
        await agent.call(
          'com.para.collection.updateCollection',
          undefined,
          {
            id: newId,
            collection: {
              id: newId,
              name: newName,
              description: source.description,
              color: source.color,
              items: source.items,
              relations: source.relations || [],
            },
          },
        )
      }
      return {id: newId}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
    },
  })
}

export function useAddToCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    void,
    Error,
    {collectionId: string; item: CivicTreeItem; existingItems: CivicTreeItem[]}
  >({
    mutationFn: async input => {
      const {collectionId, item, existingItems} = input
      // Avoid duplicates
      const itemKey = getCivicTreeItemKey(item)
      if (existingItems.some(i => getCivicTreeItemKey(i) === itemKey)) {
        return
      }
      const collection = await agent.call(
        'com.para.collection.getCollection',
        {id: collectionId},
      )
      const view = collection.data.collection as CivicTreeCollection
      await agent.call(
        'com.para.collection.updateCollection',
        undefined,
        {
          id: collectionId,
          collection: {
            id: view.id,
            name: view.name,
            description: view.description,
            color: view.color,
            items: [...view.items, item],
            relations: view.relations || [],
          },
        },
      )
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
      queryClient.invalidateQueries({
        queryKey: [RQKEY_ROOT, 'get', variables.collectionId],
      })
    },
  })
}

export function useRemoveFromCollectionMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    void,
    Error,
    {collectionId: string; itemKey: string}
  >({
    mutationFn: async input => {
      const {collectionId, itemKey} = input
      const collection = await agent.call(
        'com.para.collection.getCollection',
        {id: collectionId},
      )
      const view = collection.data.collection as CivicTreeCollection
      await agent.call(
        'com.para.collection.updateCollection',
        undefined,
        {
          id: collectionId,
          collection: {
            id: view.id,
            name: view.name,
            description: view.description,
            color: view.color,
            items: view.items.filter(i => getCivicTreeItemKey(i) !== itemKey),
            relations: (view.relations || []).filter(
              relation =>
                relation.fromItemId !== itemKey &&
                relation.toItemId !== itemKey,
            ),
          },
        },
      )
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
      queryClient.invalidateQueries({
        queryKey: [RQKEY_ROOT, 'get', variables.collectionId],
      })
    },
  })
}

export function useAddCivicTreeRelationMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<
    void,
    Error,
    {collectionId: string; relation: CivicTreeRelation}
  >({
    mutationFn: async input => {
      const {collectionId, relation} = input
      const collection = await agent.call(
        'com.para.collection.getCollection',
        {id: collectionId},
      )
      const view = collection.data.collection as CivicTreeCollection
      const relations = view.relations || []
      if (relations.some(existing => existing.id === relation.id)) {
        return
      }
      await agent.call(
        'com.para.collection.updateCollection',
        undefined,
        {
          id: collectionId,
          collection: {
            id: view.id,
            name: view.name,
            description: view.description,
            color: view.color,
            items: view.items,
            relations: [...relations, relation],
          },
        },
      )
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
      queryClient.invalidateQueries({
        queryKey: [RQKEY_ROOT, 'get', variables.collectionId],
      })
    },
  })
}

export function useRemoveCivicTreeRelationMutation() {
  const queryClient = useQueryClient()
  const agent = useAgent()
  return useMutation<void, Error, {collectionId: string; relationId: string}>({
    mutationFn: async input => {
      const {collectionId, relationId} = input
      const collection = await agent.call(
        'com.para.collection.getCollection',
        {id: collectionId},
      )
      const view = collection.data.collection as CivicTreeCollection
      await agent.call(
        'com.para.collection.updateCollection',
        undefined,
        {
          id: collectionId,
          collection: {
            id: view.id,
            name: view.name,
            description: view.description,
            color: view.color,
            items: view.items,
            relations: (view.relations || []).filter(
              relation => relation.id !== relationId,
            ),
          },
        },
      )
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: [RQKEY_ROOT, 'list']})
      queryClient.invalidateQueries({
        queryKey: [RQKEY_ROOT, 'get', variables.collectionId],
      })
    },
  })
}

interface CivicTreeCollectionInput {
  id: string
  name: string
  description?: string
  color?: string
  items: CivicTreeItem[]
  relations?: CivicTreeRelation[]
}
