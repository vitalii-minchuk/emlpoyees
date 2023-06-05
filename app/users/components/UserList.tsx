"use client";

import { User } from "@prisma/client";
import UserBox from "@/app/users/components/UserBox";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
      className="
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
      "
    >
      <div className="px-5">
        <div className="flex-col mb-4">
          <div
            className="
              text-xl
              font-semibold
              py-4
              text-neutral-800
            "
          >
            Users
          </div>
        </div>
        {users.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
