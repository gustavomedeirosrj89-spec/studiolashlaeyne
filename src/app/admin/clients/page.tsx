"use client"

import React, { useState } from 'react';
import { Search, UserPlus, TrendingUp, Ticket, XCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { capitalizeName } from '@/lib/utils';

function Modal({ aberto, onFechar, titulo, children }: { aberto: boolean; onFechar: () => void; titulo: string; children: React.ReactNode }) {
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div
        className="bg-sidebar border border-sidebar-border rounded-[2rem] p-8 w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline text-2xl text-primary font-semibold">{titulo}</h2>
          <button onClick={onFechar} className="text-muted-foreground hover:text-primary transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Modal de confirmação de exclusão ───
function ModalConfirmar({ aberto, onFechar, onConfirmar, nome }: { aberto: boolean; onFechar: () => void; onConfirmar: () => void; nome: string }) {
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4">
      <div className="bg-sidebar border border-red-500/30 rounded-[2rem] p-8 w-full max-w-[400px] shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="font-headline text-2xl text-sidebar-foreground font-semibold">Excluir Cliente</h2>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir <span className="font-bold text-sidebar-foreground">{capitalizeName(nome)}</span>?
            <br />
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Todos os agendamentos dela também serão removidos.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onFechar}
            className="flex-1 bg-sidebar-accent text-sidebar-foreground py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-sidebar-border transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const { state, dispatch } = useAdmin();
  const [busca, setBusca] = useState('');

  // Modais
  const [modalNovo, setModalNovo] = useState(false);
  const [modalEditar, setModalEditar] = useState<string | null>(null);
  const [modalHistorico, setModalHistorico] = useState<string | null>(null);
  const [modalCupom, setModalCupom] = useState(false);
  const [modalExcluir, setModalExcluir] = useState<string | null>(null);

  // Formulários
  const [novoCli, setNovoCli] = useState({ nome: '', telefone: '' });
  const [editCli, setEditCli] = useState({ nome: '', telefone: '' });
  const [novoCupom, setNovoCupom] = useState({ nome: '', tipo: 'percentual' as 'percentual' | 'fixo', valor: 0 });
  const [erroForm, setErroForm] = useState('');

  const inputClass = "w-full bg-background border border-sidebar-border rounded-xl p-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all";
  const filtrados = state.clientes.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()));

  // ── Handlers ──
  const handleSalvarNovo = () => {
    if (!novoCli.nome.trim() || !novoCli.telefone.trim()) { setErroForm('Preencha nome e WhatsApp.'); return; }
    setErroForm('');
    dispatch({ type: 'CRIAR_CLIENTE', payload: { ...novoCli, nome: capitalizeName(novoCli.nome) } });
    setModalNovo(false);
    setNovoCli({ nome: '', telefone: '' });
  };

  const abrirEditar = (cli: any) => {
    setEditCli({ nome: cli.nome, telefone: cli.telefone });
    setErroForm('');
    setModalEditar(cli.id);
  };

  const handleSalvarEditar = () => {
    if (!editCli.nome.trim() || !editCli.telefone.trim()) { setErroForm('Preencha nome e WhatsApp.'); return; }
    setErroForm('');
    dispatch({ type: 'EDITAR_CLIENTE', payload: { id: modalEditar, ...editCli, nome: capitalizeName(editCli.nome) } });
    setModalEditar(null);
  };

  const handleExcluir = () => {
    dispatch({ type: 'EXCLUIR_CLIENTE', payload: { id: modalExcluir } });
    setModalExcluir(null);
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
  const clienteExcluir = modalExcluir ? state.clientes.find(c => c.id === modalExcluir) : null;

  const corStatus: Record<string, string> = {
    confirmado: 'bg-green-500/10 text-green-400',
    remarcado: 'bg-yellow-500/10 text-yellow-400',
    finalizado: 'bg-blue-500/10 text-blue-400',
    cancelado: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-headline text-4xl text-foreground">CRM de <span className="text-primary italic">Clientes</span></h1>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Buscar por nome..."
              className="w-full bg-sidebar border border-sidebar-border rounded-xl pl-12 pr-4 h-12 text-sm text-foreground focus:border-primary transition-all focus:outline-none"
              value={busca} onChange={e => setBusca(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setErroForm(''); setModalNovo(true); }}
            className="bg-primary text-white px-5 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" /> Nova
          </button>
        </div>
      </div>

      {/* ── Estado vazio ── */}
      {filtrados.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 border border-dashed border-sidebar-border rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
            <UserPlus className="w-7 h-7" />
          </div>
          <p className="text-muted-foreground text-sm italic">
            {busca ? 'Nenhuma cliente encontrada.' : 'Nenhuma cliente cadastrada ainda.'}
          </p>
        </div>
      )}

      {/* ── Grid de clientes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map(cli => (
          <div key={cli.id} className="bg-sidebar border border-sidebar-border p-6 rounded-2xl space-y-4 hover:border-primary transition-all group">

            {/* Nome + etiquetas + ações rápidas */}
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0">
                <h3 className="font-headline text-xl text-sidebar-foreground font-bold truncate">{capitalizeName(cli.nome)}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">📱 {cli.telefone}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  title="Editar cliente"
                  onClick={() => abrirEditar(cli)}
                  className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  title="Excluir cliente"
                  onClick={() => setModalExcluir(cli.id)}
                  className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-1">
              {cli.etiquetas.map(e => (
                <span key={e} className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-bold uppercase rounded-md border border-primary/20">{e}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-sidebar-border">
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Indicações</p>
                <div className="flex items-center gap-2 text-primary font-bold mt-1">
                  <TrendingUp className="w-3 h-3" /> {cli.indicacoes}
                </div>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Cupons</p>
                <div className="flex items-center gap-2 text-primary font-bold mt-1">
                  <Ticket className="w-3 h-3" /> {cli.cupons.length}
                </div>
              </div>
            </div>

            {/* Ações principais */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => dispatch({ type: 'ADICIONAR_INDICACAO', payload: { clienteId: cli.id } })}
                className="flex-1 bg-primary/10 border border-primary/20 text-primary py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                + Indicação
              </button>
              <button
                onClick={() => setModalHistorico(cli.id)}
                className="flex-1 bg-foreground/5 border border-sidebar-border text-sidebar-foreground py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                Histórico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Seção Cupons ── */}
      <div className="pt-6 border-t border-sidebar-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-2xl text-primary">Cupons</h3>
          <button
            onClick={() => { setErroForm(''); setModalCupom(true); }}
            className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
          >
            <Plus className="w-3 h-3" /> Criar Cupom
          </button>
        </div>

        {state.cupons.length === 0 && (
          <p className="text-muted-foreground text-sm italic">Nenhum cupom criado ainda.</p>
        )}

        <div className="flex flex-wrap gap-3">
          {state.cupons.map(cup => (
            <div
              key={cup.id}
              className={`border px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                cup.ativo
                  ? 'bg-sidebar border-primary/20'
                  : 'bg-sidebar border-sidebar-border opacity-50'
              }`}
            >
              <Ticket className="w-4 h-4 text-primary shrink-0" />
              <span className="font-bold text-sm text-sidebar-foreground">{cup.nome}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold px-2 py-0.5 bg-sidebar-accent rounded-lg">
                {cup.tipo === 'percentual' ? `${cup.valor}%` : `R$ ${cup.valor}`}
              </span>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CUPOM', payload: { id: cup.id } })}
                className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${cup.ativo ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'}`}
              >
                {cup.ativo ? 'Pausar' : 'Ativar'}
              </button>
              <button
                title="Excluir cupom"
                onClick={() => dispatch({ type: 'EXCLUIR_CUPOM', payload: { id: cup.id } })}
                className="text-red-400/60 hover:text-red-400 transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MODAIS ══ */}

      {/* Nova cliente */}
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
          <button onClick={handleSalvarNovo} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">
            Cadastrar Cliente
          </button>
        </div>
      </Modal>

      {/* Editar cliente */}
      <Modal aberto={!!modalEditar} onFechar={() => { setModalEditar(null); setErroForm(''); }} titulo="Editar Cliente">
        <div className="space-y-5">
          {erroForm && <p className="text-red-400 text-xs font-bold bg-red-400/10 px-4 py-3 rounded-xl">{erroForm}</p>}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nome Completo *</label>
            <input className={inputClass} value={editCli.nome} onChange={e => setEditCli({ ...editCli, nome: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">WhatsApp *</label>
            <input className={inputClass} value={editCli.telefone} onChange={e => setEditCli({ ...editCli, telefone: e.target.value })} />
          </div>
          <button onClick={handleSalvarEditar} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">
            Salvar Alterações
          </button>
        </div>
      </Modal>

      {/* Criar cupom */}
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
          <button onClick={handleSalvarCupom} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">
            Criar Cupom
          </button>
        </div>
      </Modal>

      {/* Histórico */}
      <Modal aberto={!!modalHistorico} onFechar={() => setModalHistorico(null)} titulo={`Histórico — ${clienteHistorico?.nome ? capitalizeName(clienteHistorico.nome) : ''}`}>
        <div className="space-y-3">
          {historico.length === 0 && (
            <p className="text-muted-foreground text-sm italic text-center py-6">Nenhum agendamento registrado.</p>
          )}
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

      {/* Confirmar exclusão */}
      <ModalConfirmar
        aberto={!!modalExcluir}
        onFechar={() => setModalExcluir(null)}
        onConfirmar={handleExcluir}
        nome={clienteExcluir?.nome || ''}
      />
    </div>
  );
}
