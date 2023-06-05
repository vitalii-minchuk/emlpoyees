"use client";

import { useCallback, useState } from "react";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "@/app/components/Avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data.id, router]);
  return (
    <div
      className="
        w-full
        bg-white
        relative
        flex
        items-center
        space-x-3
        p-3
        rounded-lg
        transition
        cursor-pointer
        hover:bg-neutral-100
      "
      onClick={handleClick}
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
              flex
              justify-between
              items-center
              mb-1
            "
          >
            <p className="text-sm text-gray-800 font-medium">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
