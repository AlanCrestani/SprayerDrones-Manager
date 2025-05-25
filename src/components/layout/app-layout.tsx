// @/components/layout/app-layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserCircle, Search, Bell, Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

// Breadcrumb dinâmico
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
  const isMobile = useIsMobile();

  const [isMounted, setIsMounted] = useState(false);
  const [fixedNavbar, setFixedNavbar] = useState(true);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [headerContentVisible, setHeaderContentVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const miniStateFromCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('sidebar_mini_state='))
      ?.split('=')[1];
    if (miniStateFromCookie) {
      setSidebarMini(miniStateFromCookie === 'true');
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      setHeaderContentVisible(true);
    }
  }, [isMounted]);

  const handleSidebarMiniToggle = (isMini: boolean) => {
    setSidebarMini(isMini);
    if (typeof document !== 'undefined') {
      document.cookie = `sidebar_mini_state=${isMini}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
  };

  const getCurrentPageLabel = () => {
    if (pathname === '/dashboard' || pathname === '/') {
      const dashboardItem = navItems.find(item => item.href === '/dashboard');
      return dashboardItem ? dashboardItem.label : "Manager";
    }

    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0) {
      const baseRoute = `/${segments[0]}`;
      const navItem = navItems.find(item => item.href === baseRoute);

      if (navItem) {
        let title = navItem.label;
        if (baseRoute === '/users') {
          if (segments[1] === 'edit' && segments[2]) {
            title += ' / Editar';
          } else if (segments[1] === 'new') {
            title += ' / Novo';
          }
        }
        return title;
      }
    }
    const fallbackNavItem = navItems.find(item => item.href === pathname);
    return fallbackNavItem ? fallbackNavItem.label : "Manager";
  };

  const currentPageLabel = isMounted ? getCurrentPageLabel() : "Manager";


  const sidebarStyle: React.CSSProperties = {};


  return (
    <SidebarProvider defaultOpen={!sidebarMini} open={!sidebarMini} onOpenChange={(open) => handleSidebarMiniToggle(!open)}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{
            '--sidebar-width': '16rem',
            '--sidebar-width-icon': '3rem',
          } as React.CSSProperties}
          className="group/sidebar-wrapper flex min-h-screen w-full"
        >
          <Sidebar
            variant="floating"
            collapsible={isMobile ? "offcanvas" : "icon"}
            side="left"
            className=""
            style={sidebarStyle}
          >
            {isMounted ? (
              <SidebarHeader className="p-4">
                {headerContentVisible && (
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Logo className="w-8 h-8 text-primary" />
                    <h1 className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
                      SprayerDrones
                    </h1>
                  </Link>
                )}
                {!headerContentVisible && <div className="h-[40px]" />}
              </SidebarHeader>
            ) : (
              <div data-sidebar="header-placeholder" className="flex flex-col gap-2 p-4 h-[72px]"></div>
            )}

            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter className="p-4 mt-auto"></SidebarFooter>
          </Sidebar>

          <SidebarRail />
          <SidebarInset className={cn("flex flex-col min-h-screen", fixedNavbar ? 'pt-16' : '')}>
            <header className={cn(
              "sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm border-b",
              fixedNavbar ? 'fixed w-full left-0 md:left-[var(--sidebar-inset-left,0)] right-0' : ''
            )}
              style={fixedNavbar ? { '--sidebar-inset-left': !sidebarMini ? 'calc(16rem + 0.5rem*2)' : 'calc(3rem + 0.5rem*2)' } as React.CSSProperties : {}}
            >
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="text-sm font-medium hidden sm:flex items-center">
                  <Link
                    href="/dashboard"
                    className="text-primary no-underline hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    SprayerDrones
                  </Link>
                  {isMounted && currentPageLabel !== "Manager" && currentPageLabel !== "SprayerDrones / Dashboard" && (
                    <>
                      <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                      <span className="text-muted-foreground">{currentPageLabel.replace("SprayerDrones / ", "")}</span>
                    </>
                  )}
                  {isMounted && currentPageLabel === "SprayerDrones / Dashboard" && (
                    <>
                      <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                      <span className="text-muted-foreground">Dashboard</span>
                    </>
                  )}
                </div>
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
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Configurações">
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" />
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
            <main className="flex-1 overflow-y-auto p-6">
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
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}
