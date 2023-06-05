import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = getCurrentUser

    if (!currentUser) {
      return null
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    return conversation
  } catch (error: unknown) {
    return null
  }
}
