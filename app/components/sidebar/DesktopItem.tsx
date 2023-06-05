import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}
export const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-2
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-gray-800
          hover:bg-gray-300
        `,
          active && "bg-gray-300 text-gray-800"
        )}
      >
        <Icon
          className="
            w-6
            h-6
            shrink-0
          "
        />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
