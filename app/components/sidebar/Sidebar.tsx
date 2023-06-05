import getCurrentUser from "@/app/actions/getCurrentUser";
import { DesktopSidebar } from "@/app/components/sidebar/DesktopSidebar";
import { MobileFooter } from "@/app/components/sidebar/MobileFooter";

interface SidebarProps {
  children: React.ReactNode;
}

export default async function Sidebar({ children }: SidebarProps) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
