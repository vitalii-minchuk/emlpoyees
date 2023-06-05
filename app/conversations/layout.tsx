import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationsLayout({
  children,
}: ConversationLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
