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
    // Cálculo de atendimentos no mês
    const agMes = state.agendamentos.filter(ag => ag.data.startsWith(mesAtual) && ag.status !== 'cancelado');
    
    // Cálculo de faturamento bruto (apenas serviços finalizados)
    const faturamento = state.agendamentos
      .filter(ag => ag.status === 'finalizado' && ag.data.startsWith(mesAtual))
      .reduce((acc, ag) => acc + (state.servicos.find(s => s.id === ag.servicoId)?.valor || 0), 0);
    
    // Vagas disponíveis para hoje
    const ocupadosHoje = state.agendamentos.filter(ag => ag.data === hoje && ag.status !== 'cancelado').length;
    const livresHoje = state.horariosBase.length - ocupadosHoje;
    
    // Serviço mais procurado (Premium)
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-5xl text-foreground">
            Dashboard <span className="text-primary italic">Executivo</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">
            {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
             Status do Sistema: Operacional
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Atendimentos Mês"  
          value={stats.totalMes}            
          icon={Users}      
          description={`Sessões em ${format(new Date(), 'MMMM', { locale: ptBR })}`} 
        />
        <StatCard 
          title="Faturamento Bruto" 
          value={`R$ ${stats.faturamento}`} 
          icon={DollarSign} 
          description="Soma de serviços finalizados" 
        />
        <StatCard 
          title="Horários Livres"   
          value={stats.livresHoje}          
          icon={Clock}      
          description="Vagas disponíveis para hoje" 
        />
        <StatCard 
          title="Serviço Premium"   
          value={stats.topServico}          
          icon={Sparkles}   
          description="O estilo mais desejado" 
        />
      </div>

      <div className="bg-sidebar border border-sidebar-border rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-2xl text-primary">Agenda de Hoje</h2>
          <div className="h-[1px] flex-1 bg-primary/10 mx-6 hidden md:block" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{agendamentosHoje.length} agendamentos</span>
        </div>
        
        {agendamentosHoje.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-muted-foreground text-sm italic">Nenhum agendamento registrado para hoje.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agendamentosHoje.map(ag => {
              const cliente = state.clientes.find(c => c.id === ag.clienteId);
              const servico = state.servicos.find(s => s.id === ag.servicoId);
              return (
                <div key={ag.id} className="flex items-center justify-between p-5 bg-background/50 rounded-2xl border border-sidebar-border hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                      {cliente?.nome.substring(0,2)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{cliente?.nome}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{servico?.nome}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="hidden sm:block">
                       <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-0.5">Horário</p>
                       <p className="font-bold text-foreground">{ag.horario}</p>
                    </div>
                    <span className={`text-[9px] uppercase font-bold px-3 py-1.5 rounded-full ${corStatus[ag.status]}`}>{ag.status}</span>
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
