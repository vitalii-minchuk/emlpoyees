"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";

import { FullConversationType } from "@/app/types";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import useConversation from "@/app/hooks/useConversation";
import GroupChatModal from "@/app/conversations/components/GroupChatModal";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
        fixed
        left-0
        inset-y-0
        pb-20
        border-r-[1px]
        border-gray-200
        block w-full
        lg:pb-0
        lg:block
        lg:left-20
        lg:w-80
        overflow-y-auto
        `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 items-center">
            <div
              className="
            text-xl
            font-semibold
            py-4
            text-neutral-800
            "
            >
              Messages
            </div>
            <div
              className="
            rounded-full
            p-2
            bg-gray-200
            text-gray-600
            cursor-pointer
            hover:opacity-75
            transition
            "
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
