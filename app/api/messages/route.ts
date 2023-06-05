import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb"
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  console.log(request)
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const {
      message,
      conversationId,
      image,
    } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    })

    const updatedConversation = prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    })

    return NextResponse.json(newMessage)
  } catch (error: unknown) {
    return new NextResponse('Internal Error', {status: 500})
  }
}
