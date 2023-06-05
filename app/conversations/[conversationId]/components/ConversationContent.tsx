"use client";

import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";

interface ConversationContentProps {
  initialMessages: FullMessageType[];
}

const ConversationContent: React.FC<ConversationContentProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ConversationContent;
