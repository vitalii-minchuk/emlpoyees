import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true
          }
        }
      }
    })
    return conversations
  } catch (error: unknown) {
    return []
  }
}
