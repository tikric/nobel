'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  FileBarChart,
  Users,
  Target,
  Brain,
  MapPin,
  Settings,
  ChevronDown,
  Building2,
  TrendingUp,
  ArrowRightLeft,
  Calculator,
  AlertTriangle,
  CreditCard,
  PieChart,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

// Menu items com submenus
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Visao executiva",
  },
  {
    title: "ERP Contabil",
    url: "/erp",
    icon: Calculator,
    description: "Gestao financeira",
    submenu: [
      { title: "Receitas", url: "/erp/receitas", icon: TrendingUp },
      { title: "Despesas", url: "/erp/despesas", icon: CreditCard },
      { title: "DRE Gerencial", url: "/erp/dre", icon: FileBarChart },
      { title: "Fluxo de Caixa", url: "/erp/fluxo-caixa", icon: ArrowRightLeft },
      { title: "Ponto de Equilibrio", url: "/erp/ponto-equilibrio", icon: PieChart },
    ],
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
    description: "Gestao de clientes",
  },
  {
    title: "Prospeccao",
    url: "/prospeccao",
    icon: MapPin,
    description: "Captacao de clientes",
  },
  {
    title: "Assistente IA",
    url: "/ia",
    icon: Brain,
    description: "IA para contabilidade",
  },
  {
    title: "Configuracoes",
    url: "/configuracoes",
    icon: Settings,
    description: "Sistema e APIs",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <Sidebar className="border-none" collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold text-sidebar-foreground">Contabilidade</span>
            <span className="text-lg font-bold text-sidebar-primary">NOBEL</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.submenu ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleSubmenu(item.title)}
                    isActive={pathname.startsWith(item.url)}
                    tooltip={item.title}
                    className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden",
                        openSubmenu === item.title && "rotate-180"
                      )}
                    />
                  </SidebarMenuButton>
                  {openSubmenu === item.title && (
                    <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Link href={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    {item.title === "Assistente IA" && (
                      <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px] group-data-[collapsible=icon]:hidden bg-sidebar-primary text-sidebar-primary-foreground">
                        NEW
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator className="my-4 bg-sidebar-border/50" />

        {/* Stats rapidas no footer da sidebar */}
        <div className="px-4 group-data-[collapsible=icon]:hidden space-y-3">
          <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
            Resumo do Mes
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-foreground/80">Faturamento</span>
              <span className="font-semibold text-sidebar-primary">R$ 185K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-foreground/80">Clientes</span>
              <span className="font-semibold text-sidebar-accent-foreground">347</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-foreground/80">Margem</span>
              <span className="font-semibold text-emerald-400">33.8%</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary/20">
            <span className="text-sm font-bold text-sidebar-primary">RN</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">Ricardo Nobel</span>
            <span className="text-xs text-sidebar-foreground/60">Administrador</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
