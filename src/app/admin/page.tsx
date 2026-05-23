'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Users, DollarSign, Clock, Sparkles } from 'lucide-react';
import { useAdmin } from './AdminContext';

function StatCard({ title, value, icon: Icon, description }: { title: string; value: string | number; icon: any; description: string }) {
  return (
    <div className="bg-sidebar border border-sidebar-border p-6 rounded-2xl space-y-2 hover:border-primary transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">{title}</p>
        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-headline text-primary font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-tighter italic">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { state } = useAdmin();
  const hoje = format(new Date(), 'yyyy-MM-dd');
  const mesAtual = format(new Date(), 'yyyy-MM');

  const stats = useMemo(() => {
    const agMes = state.agendamentos.filter(ag => ag.data.startsWith(mesAtual) && ag.status !== 'cancelado');
    const faturamento = state.agendamentos
      .filter(ag => ag.status === 'finalizado' && ag.data.startsWith(mesAtual))
      .reduce((acc, ag) => acc + (state.servicos.find(s => s.id === ag.servicoId)?.valor || 0), 0);
    const ocupadosHoje = state.agendamentos.filter(ag => ag.data === hoje && ag.status !== 'cancelado').length;
    const livresHoje = state.horariosBase.length - ocupadosHoje;
    const contagem: Record<string, number> = {};
    state.agendamentos.forEach(ag => { contagem[ag.servicoId] = (contagem[ag.servicoId] || 0) + 1; });
    const topId = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topServico = state.servicos.find(s => s.id === topId)?.nome || '—';
    return { totalMes: agMes.length, faturamento, livresHoje, topServico };
  }, [state, hoje, mesAtual]);

  const agendamentosHoje = state.agendamentos.filter(ag => ag.data === hoje && ag.status !== 'cancelado');

  const corStatus: Record<string, string> = {
    confirmado: 'bg-green-500/10 text-green-400',
    remarcado:  'bg-yellow-500/10 text-yellow-400',
    finalizado: 'bg-blue-500/10 text-blue-400',
    cancelado:  'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-5xl text-foreground">
          Dashboard <span className="text-primary italic">Executivo</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">
          {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Atendimentos Mês"  value={stats.totalMes}            icon={Users}      description={`Sessões em ${format(new Date(), 'MMMM', { locale: ptBR })}`} />
        <StatCard title="Faturamento Bruto" value={`R$ ${stats.faturamento}`} icon={DollarSign} description="Soma de serviços finalizados" />
        <StatCard title="Horários Livres"   value={stats.livresHoje}          icon={Clock}      description="Vagas disponíveis para hoje" />
        <StatCard title="Serviço Premium"   value={stats.topServico}          icon={Sparkles}   description="O estilo mais desejado" />
      </div>

      <div className="bg-sidebar border border-sidebar-border rounded-2xl p-8">
        <h2 className="font-headline text-2xl text-primary mb-6">Agenda de Hoje</h2>
        {agendamentosHoje.length === 0 ? (
          <p className="text-muted-foreground text-sm italic text-center py-10">Nenhum agendamento para hoje.</p>
        ) : (
          <div className="space-y-3">
            {agendamentosHoje.map(ag => {
              const cliente = state.clientes.find(c => c.id === ag.clienteId);
              const servico = state.servicos.find(s => s.id === ag.servicoId);
              return (
                <div key={ag.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-sidebar-border hover:border-primary transition-all">
                  <div>
                    <p className="font-bold text-foreground">{cliente?.nome}</p>
                    <p className="text-[10px] text-primary uppercase font-bold tracking-wider">{servico?.nome}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className="font-bold text-foreground">{ag.horario}</p>
                    <span className={`text-[9px] uppercase font-bold px-3 py-1 rounded-full ${corStatus[ag.status]}`}>{ag.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}