import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { IconType } from "react-icons"
import { signOut } from "next-auth/react"

import useConversation from "@/app/hooks/useConversation"

interface Route {
  label: string
  href: string
  icon: IconType
  active?: boolean
  onClick?: () => void
}

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId, isOpen } = useConversation()

  const routes = useMemo<Route[]>(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || isOpen
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      icon: HiArrowLeftOnRectangle,
      onClick: () => signOut()
    },
  ], [isOpen, pathname])

  return routes
}

export default useRoutes
