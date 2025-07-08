import { getUserRoleServer } from '@/lib/auth';
import SidebarClient from './ui/SidebarClient';

export default function Sidebar({ activePage = "Home" }) {
  const role = getUserRoleServer();

  return <SidebarClient activePage={activePage} role={role} />;
}