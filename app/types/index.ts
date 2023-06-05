import { User, Message, Conversation } from '@prisma/client';

export type FullMessageType = Message & {
  seen: User[]
  sender: User
}

export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}
