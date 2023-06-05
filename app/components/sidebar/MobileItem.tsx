"use client";

import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick;
    }
  };
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
        justify-center
        group
        gap-x-3
        w-full
        flex
        leading-6
        text-sm
        font-semibold
        items-center
        p-4
        text-gray-500
        hover:text-gray-800
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-gray-800 hover:bg-gray-400"
      )}
    >
      <Icon className="w-6" />
    </Link>
  );
};

export default MobileItem;
