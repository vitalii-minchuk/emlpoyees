"use client";

import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "@/app/conversations/[conversationId]/components/ProfileDrawer";

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        bg-white
        w-full
        flex
        justify-between
        items-center
        border-b-[1px]
        sm:px-4
        lg:px-6
        shadow-sm
        py-3
        px-2
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
          "
            href="/conversations"
          >
            <HiChevronLeft size={24} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
              font-light
              text-sm
              text-neutral-500
            {statusText}
            "
            ></div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={24}
          onClick={() => setDrawerOpen(true)}
          className="
          cursor-pointer
          text-sky-500
          transition
          hover:text-sky-700
        "
        />
      </div>
    </>
  );
};

export default ConversationHeader;
