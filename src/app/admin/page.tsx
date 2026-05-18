
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { name: 'Seg', faturamento: 450 },
  { name: 'Ter', faturamento: 1200 },
  { name: 'Qua', faturamento: 800 },
  { name: 'Qui', faturamento: 1600 },
  { name: 'Sex', faturamento: 2100 },
  { name: 'Sáb', faturamento: 1300 },
];

export default function Dashboard() {
  const firestore = useFirestore();
  
  const appointmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "appointments"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: appointments } = useCollection(appointmentsQuery);

  const stats = useMemo(() => {
    if (!appointments) return { total: 0, faturamento: 0, novos: 0 };
    const total = appointments.length;
    const faturamento = appointments.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);
    return { total, faturamento, novos: Math.round(total * 0.3) };
  }, [appointments]);

  return (
    <div className="space-y-8 graceful-reveal">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-headline">Painel <span className="text-primary italic">Analítico</span></h1>
        <p className="text-muted-foreground text-sm italic">Visão geral do LAEYNE STUDIO LASH</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-[2.5rem] border-none bg-primary/5 shadow-sm overflow-hidden group hover:bg-primary/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-primary/60">Faturamento Mensal</CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-headline text-primary">R$ {stats.faturamento.toLocaleString('pt-BR')}</div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 mt-1 uppercase tracking-wider">
              <ArrowUpRight className="w-3 h-3" />
              12% em relação ao mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none bg-accent/5 shadow-sm overflow-hidden group hover:bg-accent/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-accent/60">Agendamentos</CardTitle>
            <Calendar className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-headline text-accent">{stats.total}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Atendimentos realizados</div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none bg-secondary/40 shadow-sm overflow-hidden group hover:bg-secondary/60 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Novas Clientes</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-headline text-foreground">{stats.novos}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">Expansão de base</div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none bg-foreground text-background shadow-sm overflow-hidden group transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Destaque do Mês</CardTitle>
            <Sparkles className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-headline text-white leading-tight">Volume Brasileiro</div>
            <div className="text-[10px] font-bold text-primary mt-1 uppercase tracking-wider">65% das vendas totais</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[3rem] border-none bg-white shadow-xl p-8">
          <CardHeader className="px-0 pb-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Desempenho Semanal</CardTitle>
              <p className="text-xs text-muted-foreground italic uppercase tracking-widest mt-1">Faturamento por dia</p>
            </div>
            <TrendingUp className="text-primary w-6 h-6" />
          </CardHeader>
          <CardContent className="px-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(var(--primary), 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-foreground text-background p-4 rounded-2xl shadow-2xl border-none">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                          <p className="text-xl font-headline text-primary">R$ {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="faturamento" 
                  fill="hsl(var(--primary))" 
                  radius={[10, 10, 10, 10]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[3rem] border-none bg-white shadow-xl p-8">
          <CardHeader className="px-0 pb-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Retenção de Clientes</CardTitle>
              <p className="text-xs text-muted-foreground italic uppercase tracking-widest mt-1">Frequência de retorno</p>
            </div>
            <Users className="text-accent w-6 h-6" />
          </CardHeader>
          <CardContent className="px-0 h-[300px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-headline text-primary">82%</div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-[200px] mx-auto">
                Das suas clientes retornaram para manutenção nos últimos 30 dias.
              </p>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <div className="w-2 h-2 rounded-full bg-primary/20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
