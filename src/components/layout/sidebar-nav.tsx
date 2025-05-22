// @/components/layout/sidebar-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users, // Icon for Usuários
  Rocket, // Icon for Drones
  Briefcase, // Icon for Clientes (Placeholder, consider Briefcase or UserCheck)
  Archive, // Icon for Produtos
  FileSpreadsheet, // Icon for Orçamentos
  ClipboardList, // Icon for Serviços
  BarChartBig, // Icon for Relatórios
  Settings, // Icon for Configurações
  Route,
  Wand2,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// Export navItems so it can be used in app-layout.tsx for breadcrumbs
export const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Usuários', icon: Users },
  { href: '/drones', label: 'Drones', icon: Rocket },
  { href: '/clients', label: 'Clientes', icon: Briefcase },
  { href: '/products', label: 'Produtos', icon: Archive },
  { href: '/budgets', label: 'Orçamentos', icon: FileSpreadsheet },
  { href: '/services', label: 'Serviços', icon: ClipboardList },
  { href: '/reports', label: 'Relatórios', icon: BarChartBig },
  { href: '/optimize-route', label: 'Optimize Route', icon: Route, iconSecondary: Wand2 },
  { href: '/settings', label: 'Configurações', icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
              className="w-full justify-start"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              {item.iconSecondary && <item.iconSecondary className="h-5 w-5 ml-[-0.5rem] text-primary" />}
              <span className={cn(item.iconSecondary && "ml-1")}>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
