import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  conversationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    const {conversationId} = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      }
    })

    if (!conversation) {
      return new NextResponse("Bad request", {status: 400})
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    })

    return NextResponse.json(deletedConversation)
  } catch (error: unknown) {
    return new NextResponse("Internal Error", {status: 500})
  }
}
