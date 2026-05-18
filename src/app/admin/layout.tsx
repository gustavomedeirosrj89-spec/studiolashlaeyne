
'use client';

import { useState, useEffect } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Sparkles, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Settings,
  LogOut,
  UserCircle,
  Lock,
  Sparkle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ADMIN_USER = "laeyne.admin";
const ADMIN_PASS = "Lx#8472Studio";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Agendamentos", icon: Calendar, href: "/admin/appointments" },
  { title: "Clientes", icon: Users, href: "/admin/clients" },
  { title: "Serviços", icon: Sparkles, href: "/admin/services" },
  { title: "Financeiro", icon: DollarSign, href: "/admin/finance" },
  { title: "Estoque", icon: Package, href: "/admin/inventory" },
  { title: "Marketing", icon: TrendingUp, href: "/admin/marketing" },
  { title: "Configurações", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const auth = sessionStorage.getItem("laeyne_auth");
    setIsAuthorized(auth === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("laeyne_auth", "true");
      setIsAuthorized(true);
      toast({ title: "Bem-vinda, Laeyne", description: "Acesso autorizado com sucesso." });
    } else {
      toast({ variant: "destructive", title: "Erro", description: "Credenciais inválidas." });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("laeyne_auth");
    setIsAuthorized(false);
  };

  if (isAuthorized === null) return null;

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 graceful-reveal">
          <div className="text-center space-y-2">
            <Sparkle className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <h1 className="text-4xl font-headline uppercase tracking-widest">Acesso <span className="text-primary italic">VIP</span></h1>
            <p className="text-muted-foreground text-sm italic">Gestão Editorial Laeyne Studio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 bg-white/50 backdrop-blur-xl p-10 rounded-[3rem] border border-primary/10 shadow-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-4 text-foreground/60">Usuário</Label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <input required type="text" className="flex h-14 w-full pl-12 bg-white/50 border-none rounded-2xl text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-4 text-foreground/60">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <input type="password" required className="flex h-14 w-full pl-12 bg-white/50 border-none rounded-2xl text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full h-16 rounded-full bg-primary text-white font-black uppercase tracking-[0.2em]">Entrar no Painel</Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <Sidebar className="bg-sidebar border-r border-sidebar-border shadow-2xl z-50 overflow-hidden">
          <SidebarHeader className="p-8 bg-sidebar">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl uppercase tracking-widest leading-none text-sidebar-foreground">LAEYNE</span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-black text-primary">STUDIO LASH</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-6 py-4 bg-sidebar">
            <SidebarMenu className="gap-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className="h-14 rounded-2xl px-5 transition-all duration-300 data-[active=true]:bg-primary data-[active=true]:text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-8 border-t border-sidebar-border bg-sidebar">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full justify-start gap-4 h-14 rounded-2xl text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10 group transition-all"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sair</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col bg-background h-screen">
          <header className="h-20 flex items-center px-10 border-b border-primary/5 bg-white/60 backdrop-blur-xl sticky top-0 z-40">
            <SidebarTrigger className="hover:bg-primary/5" />
            <div className="ml-6 h-6 w-[1px] bg-primary/10" />
            <div className="ml-auto flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-black tracking-widest text-primary">Modo Admin Luxo</span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest italic">Laeyne Studio v2.0</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 shadow-sm transition-transform hover:scale-105">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-10 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
