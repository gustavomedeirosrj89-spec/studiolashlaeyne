'use client';

import React, { useState } from 'react';
import { Search, UserPlus, TrendingUp, Ticket, XCircle, Plus } from 'lucide-react';
import { useAdmin } from '../AdminContext';

function Modal({ aberto, onFechar, titulo, children }: { aberto: boolean; onFechar: () => void; titulo: string; children: React.ReactNode }) {
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-sidebar border border-sidebar-border rounded-[2rem] p-8 w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline text-2xl text-primary font-semibold">{titulo}</h2>
          <button onClick={onFechar} className="text-muted-foreground hover:text-primary transition-colors"><XCircle className="w-6 h-6" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const { state, dispatch } = useAdmin();
  const [busca, setBusca] = useState('');
  const [modalNovo, setModalNovo] = useState(false);
  const [modalHistorico, setModalHistorico] = useState<string | null>(null);
  const [modalCupom, setModalCupom] = useState(false);
  const [novoCli, setNovoCli] = useState({ nome: '', telefone: '' });
  const [novoCupom, setNovoCupom] = useState({ nome: '', tipo: 'percentual' as 'percentual' | 'fixo', valor: 0 });
  const [erroForm, setErroForm] = useState('');

  const inputClass = "w-full bg-background border border-sidebar-border rounded-xl p-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all";
  const filtrados = state.clientes.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()));

  const handleSalvarCliente = () => {
    if (!novoCli.nome.trim() || !novoCli.telefone.trim()) { setErroForm('Preencha nome e WhatsApp.'); return; }
    setErroForm('');
    dispatch({ type: 'CRIAR_CLIENTE', payload: novoCli });
    setModalNovo(false);
    setNovoCli({ nome: '', telefone: '' });
  };

  const handleSalvarCupom = () => {
    if (!novoCupom.nome.trim() || novoCupom.valor <= 0) { setErroForm('Nome e valor são obrigatórios.'); return; }
    setErroForm('');
    dispatch({ type: 'CRIAR_CUPOM', payload: novoCupom });
    setModalCupom(false);
    setNovoCupom({ nome: '', tipo: 'percentual', valor: 0 });
  };

  const clienteHistorico = modalHistorico ? state.clientes.find(c => c.id === modalHistorico) : null;
  const historico = modalHistorico ? state.agendamentos.filter(ag => ag.clienteId === modalHistorico) : [];

  const corStatus: Record<string, string> = {
    confirmado: 'bg-green-500/10 text-green-400',
    remarcado: 'bg-yellow-500/10 text-yellow-400',
    finalizado: 'bg-blue-500/10 text-blue-400',
    cancelado: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-headline text-4xl text-foreground">CRM de <span className="text-primary italic">Clientes</span></h1>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Buscar por nome..."
              className="w-full bg-sidebar border border-sidebar-border rounded-xl pl-12 pr-4 h-12 text-sm text-foreground focus:border-primary transition-all focus:outline-none"
              value={busca} onChange={e => setBusca(e.target.value)} />
          </div>
          <button onClick={() => { setErroForm(''); setModalNovo(true); }}
            className="bg-primary text-white px-5 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all shrink-0">
            <UserPlus className="w-4 h-4" /> Nova
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map(cli => (
          <div key={cli.id} className="bg-sidebar border border-sidebar-border p-6 rounded-2xl space-y-4 hover:border-primary transition-all">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-headline text-2xl text-foreground font-bold">{cli.nome}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">📱 {cli.telefone}</p>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                {cli.etiquetas.map(e => (
                  <span key={e} className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-bold uppercase rounded-md border border-primary/20">{e}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sidebar-border">
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Indicações</p>
                <div className="flex items-center gap-2 text-primary font-bold mt-1"><TrendingUp className="w-3 h-3" /> {cli.indicacoes}</div>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Cupons</p>
                <div className="flex items-center gap-2 text-primary font-bold mt-1"><Ticket className="w-3 h-3" /> {cli.cupons.length}</div>
              </div>
            </div>
            {cli.cupons.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {cli.cupons.map(cup => (
                  <span key={cup} className="text-[8px] uppercase font-bold px-2 py-0.5 bg-primary/5 border border-primary/20 text-primary rounded-full">{cup}</span>
                ))}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button onClick={() => dispatch({ type: 'ADICIONAR_INDICACAO', payload: { clienteId: cli.id } })}
                className="flex-1 bg-sidebar-accent text-foreground py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                + Indicação
              </button>
              <button onClick={() => setModalHistorico(cli.id)}
                className="flex-1 bg-sidebar-accent text-foreground py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Histórico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cupons */}
      <div className="pt-6 border-t border-sidebar-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-2xl text-primary">Cupons</h3>
          <button onClick={() => { setErroForm(''); setModalCupom(true); }}
            className="bg-sidebar-accent text-foreground px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
            <Plus className="w-3 h-3" /> Criar Cupom
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {state.cupons.map(cup => (
            <div key={cup.id} className={`border px-5 py-3 rounded-xl flex items-center gap-3 transition-all ${cup.ativo ? 'bg-sidebar border-sidebar-border' : 'bg-sidebar border-sidebar-border opacity-40'}`}>
              <Ticket className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm text-foreground">{cup.nome}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold px-2 py-0.5 bg-sidebar-accent rounded-lg">
                {cup.tipo === 'percentual' ? `${cup.valor}%` : `R$ ${cup.valor}`}
              </span>
              <button onClick={() => dispatch({ type: 'TOGGLE_CUPOM', payload: { id: cup.id } })}
                className="text-[9px] font-bold text-muted-foreground hover:text-primary transition-colors">
                {cup.ativo ? 'desativar' : 'ativar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal novo cliente */}
      <Modal aberto={modalNovo} onFechar={() => { setModalNovo(false); setErroForm(''); }} titulo="Cadastrar Cliente">
        <div className="space-y-5">
          {erroForm && <p className="text-red-400 text-xs font-bold bg-red-400/10 px-4 py-3 rounded-xl">{erroForm}</p>}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nome Completo *</label>
            <input className={inputClass} placeholder="Ex: Maria Clara..." value={novoCli.nome} onChange={e => setNovoCli({ ...novoCli, nome: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">WhatsApp *</label>
            <input className={inputClass} placeholder="Ex: 85999990000" value={novoCli.telefone} onChange={e => setNovoCli({ ...novoCli, telefone: e.target.value })} />
          </div>
          <button onClick={handleSalvarCliente} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">Cadastrar Cliente</button>
        </div>
      </Modal>

      {/* Modal criar cupom */}
      <Modal aberto={modalCupom} onFechar={() => { setModalCupom(false); setErroForm(''); }} titulo="Criar Cupom">
        <div className="space-y-5">
          {erroForm && <p className="text-red-400 text-xs font-bold bg-red-400/10 px-4 py-3 rounded-xl">{erroForm}</p>}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Código do Cupom *</label>
            <input className={inputClass} placeholder="Ex: INDIQUEGANHE" value={novoCupom.nome} onChange={e => setNovoCupom({ ...novoCupom, nome: e.target.value.toUpperCase() })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tipo *</label>
              <select className={inputClass} value={novoCupom.tipo} onChange={e => setNovoCupom({ ...novoCupom, tipo: e.target.value as 'percentual' | 'fixo' })}>
                <option value="percentual">Percentual (%)</option>
                <option value="fixo">Fixo (R$)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Valor *</label>
              <input type="number" min={1} className={inputClass} value={novoCupom.valor || ''} onChange={e => setNovoCupom({ ...novoCupom, valor: parseFloat(e.target.value) || 0 })} />
            </div>
          </div>
          <button onClick={handleSalvarCupom} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">Criar Cupom</button>
        </div>
      </Modal>

      {/* Modal histórico */}
      <Modal aberto={!!modalHistorico} onFechar={() => setModalHistorico(null)} titulo={`Histórico — ${clienteHistorico?.nome}`}>
        <div className="space-y-3">
          {historico.length === 0 && <p className="text-muted-foreground text-sm italic text-center py-6">Nenhum agendamento registrado.</p>}
          {historico.map(ag => {
            const servico = state.servicos.find(s => s.id === ag.servicoId);
            return (
              <div key={ag.id} className="flex justify-between items-center p-4 bg-background rounded-xl border border-sidebar-border">
                <div>
                  <p className="font-bold text-sm text-foreground">{servico?.nome}</p>
                  <p className="text-xs text-muted-foreground">{ag.data} às {ag.horario}</p>
                </div>
                <span className={`text-[9px] uppercase font-bold px-2 py-1 rounded-full ${corStatus[ag.status]}`}>{ag.status}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}