"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";
import { DesktopItem } from "@/app/components/sidebar/DesktopItem";
import Avatar from "@/app/components/Avatar";
import SettingsModal from "@/app/components/sidebar/SettingsModal";

interface DesktopSidebarProps {
  currentUser: User | null;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser,
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
        hidden
        justify-between
        lg:fixed
        lg:inset-0
        lg:left-0
        lg:z-40
        lg:w-20
        lg:overflow-y-auto
        lg:flex
        lg:border-r-[1px]
        lg:flex-col
        lg:pb-4
        xl:px-6
      "
      >
        <nav
          className="
          mt-4
          flex
          flex-col
          justify-between
        "
        >
          <ul
            role="list"
            className="
            flex
            items-center
            flex-col
            space-y-1
          "
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                onClick={item.onClick}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
          items-center
          flex mt-t
          flex-col
          justify-between
        "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
            hover:opacity-75
            transition
            cursor-pointer
          "
          >
            <Avatar user={currentUser} />
          </div>
          {isOpen}
        </nav>
      </div>
    </>
  );
};
