
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
                <Label className="text-[10px] uppercase font-black tracking-widest ml-4">Usuário</Label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input required className="h-14 pl-12 bg-white/50 border-none rounded-2xl" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-4">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input type="password" required className="h-14 pl-12 bg-white/50 border-none rounded-2xl" value={password} onChange={(e) => setPassword(e.target.value)} />
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
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-primary/10">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <Sparkle className="w-6 h-6 text-primary" />
              <span className="font-headline text-xl uppercase tracking-widest">LAEYNE</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className="h-12 rounded-2xl px-4 hover:bg-primary/5 data-[active=true]:bg-primary data-[active=true]:text-white transition-all"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6">
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 rounded-2xl text-muted-foreground hover:text-destructive">
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Sair</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="h-16 flex items-center px-8 border-b border-primary/5 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-primary">Modo Admin Luxo</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
