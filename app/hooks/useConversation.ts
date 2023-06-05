import { useMemo } from "react";
import { useParams } from "next/navigation";

const useConversation = () => {
  const params = useParams()

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return ''
    }

    return params.conversationId as string
  }, [params])

  const isOpen = useMemo(() => Boolean(conversationId), [conversationId])

  return useMemo(() => ({
    conversationId,
    isOpen
  }), [conversationId, isOpen])
}

export default useConversation
