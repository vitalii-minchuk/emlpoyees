import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  const users = await getUsers();
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
