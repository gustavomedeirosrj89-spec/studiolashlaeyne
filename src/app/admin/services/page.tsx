'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
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

const CAMPOS_VAZIOS = { nome: '', valor: 0, duracao: 60, descricao: '' };

export default function ServicesPage() {
  const { state, dispatch } = useAdmin();
  const [modalAberto, setModalAberto] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erroForm, setErroForm] = useState('');

  const hoje = new Date().toISOString().split('T')[0];
  const inputClass = "w-full bg-background border border-sidebar-border rounded-xl p-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all";

  const podeExcluir = (servicoId: string) =>
    !state.agendamentos.some(ag => ag.servicoId === servicoId && ag.data >= hoje && ag.status !== 'cancelado');

  const abrirNovo = () => { setEditId(null); setCampos(CAMPOS_VAZIOS); setErroForm(''); setModalAberto(true); };
  const abrirEdicao = (s: any) => { setEditId(s.id); setCampos({ nome: s.nome, valor: s.valor, duracao: s.duracao, descricao: s.descricao }); setErroForm(''); setModalAberto(true); };

  const handleSalvar = () => {
    if (!campos.nome.trim()) { setErroForm('Nome do procedimento é obrigatório.'); return; }
    if (campos.valor <= 0) { setErroForm('Valor deve ser maior que zero.'); return; }
    if (campos.duracao <= 0) { setErroForm('Duração deve ser maior que zero.'); return; }
    setErroForm('');
    if (editId) {
      dispatch({ type: 'EDITAR_SERVICO', payload: { ...campos, id: editId } });
    } else {
      dispatch({ type: 'CRIAR_SERVICO', payload: campos });
    }
    setModalAberto(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-4xl text-foreground">Catálogo de <span className="text-primary italic">Serviços</span></h1>
        <button onClick={abrirNovo} className="bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all">
          <Plus className="w-4 h-4" /> Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.servicos.map(s => (
          <div key={s.id} className={`bg-sidebar border border-sidebar-border p-6 rounded-2xl space-y-4 hover:border-primary transition-all ${!s.ativo ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-headline text-xl text-primary font-bold leading-tight">{s.nome}</h3>
              {!s.ativo && <span className="text-[8px] uppercase font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full shrink-0">Inativo</span>}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic min-h-[2rem]">{s.descricao || 'Sem descrição'}</p>
            <div className="flex justify-between items-end pt-4 border-t border-sidebar-border">
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Investimento</p>
                <p className="text-2xl font-bold text-sidebar-foreground">R$ {s.valor}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Duração</p>
                <div className="flex items-center gap-1 text-sidebar-foreground text-sm justify-end">
                  <Clock className="w-3 h-3 text-primary" /> {s.duracao} min
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button title="Editar" onClick={() => abrirEdicao(s)}
                className="flex-1 bg-sidebar-accent hover:bg-primary hover:text-white py-2 rounded-lg text-xs transition-all flex items-center justify-center text-sidebar-foreground">
                <Edit className="w-4 h-4" />
              </button>
              <button title={s.ativo ? 'Desativar' : 'Ativar'} onClick={() => dispatch({ type: 'TOGGLE_SERVICO', payload: { id: s.id } })}
                className="flex-1 bg-sidebar-accent hover:bg-primary hover:text-white py-2 rounded-lg text-xs transition-all flex items-center justify-center text-sidebar-foreground">
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                title={podeExcluir(s.id) ? 'Excluir' : 'Possui agendamentos futuros — não pode excluir'}
                onClick={() => { if (podeExcluir(s.id)) dispatch({ type: 'EXCLUIR_SERVICO', payload: { id: s.id } }); }}
                disabled={!podeExcluir(s.id)}
                className="flex-1 bg-sidebar-accent hover:bg-red-500/20 hover:text-red-400 py-2 rounded-lg text-xs transition-all flex items-center justify-center text-sidebar-foreground disabled:opacity-30 disabled:cursor-not-allowed">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)} titulo={editId ? 'Editar Serviço' : 'Novo Serviço'}>
        <div className="space-y-5">
          {erroForm && <p className="text-red-400 text-xs font-bold bg-red-400/10 px-4 py-3 rounded-xl">{erroForm}</p>}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nome do Procedimento *</label>
            <input className={inputClass} placeholder="Ex: Volume Russo" value={campos.nome} onChange={e => setCampos({ ...campos, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Valor R$ *</label>
              <input type="number" min={1} className={inputClass} value={campos.valor || ''} onChange={e => setCampos({ ...campos, valor: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duração (min) *</label>
              <input type="number" min={1} className={inputClass} value={campos.duracao || ''} onChange={e => setCampos({ ...campos, duracao: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Descrição</label>
            <textarea className={`${inputClass} h-24 resize-none`} placeholder="Breve descrição..." value={campos.descricao} onChange={e => setCampos({ ...campos, descricao: e.target.value })} />
          </div>
          <button onClick={handleSalvar} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all">
            {editId ? 'Salvar Alterações' : 'Criar Serviço'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
