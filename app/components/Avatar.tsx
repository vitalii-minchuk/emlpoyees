"use client";

import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
  user: User | null;
}
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
      >
        <Image alt="avatar" src={user?.image || "/img/placeholder.jpg"} fill />
      </div>
      <div
        className="
          absolute
          top-0
          right-0
          rounded-full
          bg-lime-600
          w-3
          h-3
          ring-1
          ring-white
        "
      />
    </div>
  );
};

export default Avatar;
