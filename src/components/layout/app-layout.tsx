// @/components/layout/app-layout.tsx
'use client';

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import SidebarNav, { navItems } from './sidebar-nav';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Search, Bell, Settings as SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);

  // Mapeamento para nomes amigáveis
  const labels: Record<string, string> = {
    dashboard: "Dashboard",
    users: "Usuários",
    new: "Novo Usuário",
    edit: "Editar Usuário",
    products: "Produtos",
    services: "Serviços",
    clients: "Clientes",
    reports: "Relatórios",
    settings: "Configurações",
    // Adicione outros conforme necessário
  };

  // Monta os breadcrumbs
  const crumbs = [
    <Link
      key="home"
      href="/dashboard"
      className="text-[#1570BF] no-underline hover:-translate-y-0.5 transition-transform duration-200"
    >
      SprayerDrones
    </Link>,
    ...pathParts.map((part, idx) => {
      const href = '/' + pathParts.slice(0, idx + 1).join('/');
      const isLast = idx === pathParts.length - 1;
      const label = labels[part] || part.charAt(0).toUpperCase() + part.slice(1);
      return (
        <span key={href} className="flex items-center">
          <span className="mx-1 text-muted-foreground">/</span>
          {isLast ? (
            <span className="text-muted-foreground">{label}</span>
          ) : (
            <Link
              href={href}
              className="text-[#1570BF] no-underline hover:-translate-y-0.5 transition-transform duration-200"
            >
              {label}
            </Link>
          )}
        </span>
      );
    }),
  ];

  return (
    <nav className="text-sm font-medium hidden sm:flex items-center">
      {crumbs}
    </nav>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getCurrentPageLabel = () => {
    const currentNavItem = navItems.find(item => item.href === pathname || (item.href !== '/dashboard' && pathname.startsWith(item.href)));
    return currentNavItem ? currentNavItem.label : "Manager";
  };

  const currentPageLabel = getCurrentPageLabel();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="floating" collapsible="icon" side="left">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" suppressHydrationWarning className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
              SprayerDrones
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto"></SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Breadcrumb />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] lg:w-[300px] rounded-full h-9" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Link href="/settings" passHref>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Configurações">
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Configurações</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person avatar" />
                    <AvatarFallback>
                      <UserCircle className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Usuário Logado</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      usuario@exemplo.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        <footer className="px-6 py-4 border-t bg-background text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="#" className="hover:text-primary">Home</Link>
            <Link href="#" className="hover:text-primary">Empresa</Link>
            <Link href="#" className="hover:text-primary">Portfólio</Link>
            <Link href="#" className="hover:text-primary">Blog</Link>
          </div>
          © {new Date().getFullYear()} SprayerDrones Manager. Todos os direitos reservados.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
