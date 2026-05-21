import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {useAgent} from '#/state/session'

export interface AgentChatMessage {
  id: string
  text: string
  sender: 'user' | 'agent'
  createdAt: string
}

const RQKEY = (agentId: string) => ['agent-chat', agentId]

export function useAgentChatQuery(agentId: string) {
  const agent = useAgent()

  return useQuery({
    queryKey: RQKEY(agentId),
    queryFn: async () => {
      const {data} = await agent.call('com.para.agent.getConversation', {
        agentId,
      })
      return (data.messages ?? []) as AgentChatMessage[]
    },
    staleTime: 1000 * 30, // 30 seconds
  })
}

export function useSendAgentMessageMutation(agentId: string) {
  const agent = useAgent()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (text: string) => {
      const {data} = await agent.call(
        'com.para.agent.sendMessage',
        undefined,
        {agentId, text},
        {encoding: 'application/json'},
      )
      return data.message as AgentChatMessage
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: RQKEY(agentId)})
    },
  })
}
