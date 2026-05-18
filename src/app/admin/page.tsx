
'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  deleteDoc,
  doc
} from 'firebase/firestore';
import { 
  useFirestore, 
  useCollection
} from '@/firebase';
import { Navbar } from "@/components/studio/Navbar";
import { Footer } from "@/components/studio/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Clock, 
  User, 
  Sparkles, 
  LogOut, 
  Trash2,
  CalendarDays,
  Lock,
  UserCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, addDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const ADMIN_USER = "laeyne.admin";
const ADMIN_PASS = "Lx#8472Studio";

export default function AdminPanel() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [filter, setFilter] = useState<'all' | 'week'>('week');

  useEffect(() => {
    const auth = sessionStorage.getItem("laeyne_auth");
    setIsAuthorized(auth === "true");
  }, []);

  const appointmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "appointments"),
      orderBy("date", "asc"),
      orderBy("time", "asc")
    );
  }, [firestore]);

  const { data: appointments, loading: dataLoading } = useCollection(appointmentsQuery);

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    if (filter === 'all') return appointments;

    const today = startOfDay(new Date());
    const nextWeek = endOfDay(addDays(today, 7));

    return appointments.filter(app => {
      try {
        const appDate = new Date(app.date + 'T00:00:00');
        return isWithinInterval(appDate, { start: today, end: nextWeek });
      } catch {
        return false;
      }
    });
  }, [appointments, filter]);

  const stats = useMemo(() => {
    if (!filteredAppointments) return { total: 0, services: {} };
    const services = filteredAppointments.reduce((acc: any, app: any) => {
      acc[app.serviceName] = (acc[app.serviceName] || 0) + 1;
      return acc;
    }, {});
    return { total: filteredAppointments.length, services };
  }, [filteredAppointments]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("laeyne_auth", "true");
      setIsAuthorized(true);
      toast({
        title: "Acesso Autorizado",
        description: "Bem-vinda de volta, Laeyne.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro de Acesso",
        description: "Usuário ou senha incorretos.",
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("laeyne_auth");
    setIsAuthorized(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente remover este agendamento?")) {
      if (firestore) {
        await deleteDoc(doc(firestore, "appointments", id));
      }
    }
  };

  if (isAuthorized === null) return null;

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        
        <div className="w-full max-w-md space-y-12 relative z-10 graceful-reveal">
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-headline uppercase tracking-widest text-foreground">
              Acesso <br />
              <span className="text-primary italic">Restrito</span>
            </h1>
            <p className="text-muted-foreground italic text-sm">Portal administrativo Laeyne Studio.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 text-left bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-4">Usuário</Label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input 
                    required 
                    placeholder="Seu usuário" 
                    className="h-14 pl-12 bg-white/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/20" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-4">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input 
                    type="password" 
                    required 
                    placeholder="Sua senha" 
                    className="h-14 pl-12 bg-white/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/20" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full h-16 rounded-full bg-primary text-white text-sm font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-transform">
              Entrar no Painel
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-primary/10 pb-12 graceful-reveal">
          <div className="space-y-4">
            <h4 className="text-accent uppercase tracking-[0.4em] font-black text-xs">Gestão Operacional</h4>
            <h1 className="text-5xl md:text-7xl font-headline leading-none">
              Meus <br />
              <span className="text-primary italic">Agendamentos</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant={filter === 'week' ? 'default' : 'outline'}
              onClick={() => setFilter('week')}
              className="rounded-full px-6"
            >
              Esta Semana
            </Button>
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="rounded-full px-6"
            >
              Todos
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="rounded-full text-muted-foreground hover:text-destructive">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <Card className="rounded-[2.5rem] bg-primary/5 border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-black text-primary/60">Total {filter === 'week' ? 'da Semana' : ''}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-headline text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-1">Procedimentos agendados</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-[2.5rem] bg-secondary/30 border-none shadow-sm md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-black text-accent/60">Serviços Mais Procurados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {Object.entries(stats.services).length > 0 ? (
                Object.entries(stats.services).map(([name, count]: [string, any]) => (
                  <Badge key={name} variant="outline" className="bg-white/50 border-accent/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {name}: {count}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">Nenhum agendamento encontrado.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/20 shadow-xl overflow-hidden graceful-reveal" style={{ animationDelay: '0.2s' }}>
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="border-b border-primary/5">
                <TableHead className="py-6 px-8 text-[10px] uppercase font-black tracking-widest">Data & Hora</TableHead>
                <TableHead className="py-6 px-8 text-[10px] uppercase font-black tracking-widest">Cliente</TableHead>
                <TableHead className="py-6 px-8 text-[10px] uppercase font-black tracking-widest">Procedimento</TableHead>
                <TableHead className="py-6 px-8 text-right text-[10px] uppercase font-black tracking-widest">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center italic text-muted-foreground">Carregando agendamentos...</TableCell>
                </TableRow>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((app: any) => (
                  <TableRow key={app.id} className="group border-b border-primary/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="py-6 px-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <CalendarDays className="w-3 h-3" />
                          <span className="text-sm">
                            {format(new Date(app.date + 'T00:00:00'), "dd 'de' MMM", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs font-medium">{app.time}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-foreground tracking-tight">{app.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 text-[10px] uppercase font-bold tracking-wider">
                        {app.serviceName}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(app.id)}
                        className="rounded-full hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center text-muted-foreground italic">Nenhum agendamento para este período.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <Footer />
    </main>
  );
}
