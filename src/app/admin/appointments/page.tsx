"use client"

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { useFirestore } from '@/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { capitalizeName } from '@/lib/utils';

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

const corStatus: Record<string, string> = {
  pendente:   'bg-slate-500/10 text-slate-400',
  confirmado: 'bg-green-500/10 text-green-400',
  remarcado:  'bg-yellow-500/10 text-yellow-400',
  finalizado: 'bg-blue-500/10 text-blue-400',
  cancelado:  'bg-red-500/10 text-red-400',
};

export default function AppointmentsPage() {
  const { state } = useAdmin();
  const firestore = useFirestore();
  const hoje = format(new Date(), 'yyyy-MM-dd');
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [mesBase, setMesBase] = useState(new Date());
  const [modalNovo, setModalNovo] = useState(false);
  const [novoAg, setNovoAg] = useState({ clientName: '', serviceName: '', date: hoje, time: '', tipoServico: 'manutencao' });
  const [erroForm, setErroForm] = useState('');

  const agendamentosDoDia = state.agendamentos.filter(ag => ag.date === dataSelecionada && ag.status !== 'cancelado');
  
  const handleSalvar = async () => {
    if (!novoAg.clientName || !novoAg.serviceName || !novoAg.time || !novoAg.date) {
      setErroForm('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!firestore) return;

    try {
      await addDoc(collection(firestore, 'appointments'), {
        ...novoAg,
        clientName: capitalizeName(novoAg.clientName),
        status: 'confirmado',
        createdAt: serverTimestamp(),
        duration: novoAg.tipoServico === 'cilios_completo' ? 180 : 90
      });
      setModalNovo(false);
      setNovoAg({ clientName: '', serviceName: '', date: hoje, time: '', tipoServico: 'manutencao' });
    } catch (e) {
      setErroForm('Erro ao salvar agendamento.');
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'appointments', id);
    await updateDoc(docRef, { status: newStatus });
  };

  const diasDoMes = eachDayOfInterval({ start: startOfMonth(mesBase), end: endOfMonth(mesBase) });
  const inputClass = "w-full bg-background border border-sidebar-border rounded-xl p-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all";

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-4xl text-foreground">Agenda <span className="text-primary italic">Editorial</span></h1>
        <button
          onClick={() => { setNovoAg({ ...novoAg, date: dataSelecionada }); setModalNovo(true); }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all"
        >
          <Plus className="w-4 h-4" /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-sidebar border border-sidebar-border rounded-2xl p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-xl text-primary capitalize">
              {format(mesBase, 'MMMM yyyy', { locale: ptBR })}
            </h3>
            <div className="flex gap-1">
              <button onClick={() => setMesBase(m => subMonths(m, 1))} className="p-2 hover:text-primary transition-colors rounded-lg hover:bg-sidebar-accent"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setMesBase(m => addMonths(m, 1))} className="p-2 hover:text-primary transition-colors rounded-lg hover:bg-sidebar-accent"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground font-bold mb-4 uppercase">
            {['D','S','T','Q','Q','S','S'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: diasDoMes[0].getDay() }).map((_, i) => <div key={`e${i}`} />)}
            {diasDoMes.map((day, i) => {
              const iso = format(day, 'yyyy-MM-dd');
              const isSelected = iso === dataSelecionada;
              const isToday = isSameDay(day, new Date());
              const temAg = state.agendamentos.some(ag => ag.date === iso && ag.status !== 'cancelado');
              return (
                <button key={i} onClick={() => setDataSelecionada(iso)}
                  className={`aspect-square rounded-lg text-xs font-semibold transition-all relative ${
                    isSelected ? 'bg-primary text-white' :
                    isToday    ? 'border border-primary text-primary' :
                    'hover:bg-sidebar-accent text-muted-foreground'
                  }`}>
                  {format(day, 'd')}
                  {temAg && !isSelected && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-[0.2em]">
            Horários para {format(parseISO(dataSelecionada), "dd 'de' MMMM", { locale: ptBR })}
          </p>
          {state.horariosBase.map(h => {
            const ag = agendamentosDoDia.find(a => a.time === h);
            return (
              <div key={h} className="flex gap-4 items-center group">
                <span className="text-xs font-bold text-muted-foreground w-12 shrink-0">{h}</span>
                {ag ? (
                  <div className="flex-1 bg-sidebar border border-sidebar-border p-4 rounded-xl flex justify-between items-center group-hover:border-primary transition-all">
                    <div>
                      <p className="font-bold text-sidebar-foreground">{capitalizeName(ag.clientName)}</p>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-wider">{ag.serviceName}</p>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${corStatus[ag.status]}`}>{ag.status}</span>
                    </div>
                    <div className="flex gap-1">
                      {ag.status === 'pendente' && (
                        <button title="Confirmar" onClick={() => updateStatus(ag.id, 'confirmado')}
                          className="p-2 rounded-lg hover:bg-green-500/10 hover:text-green-400 transition-colors text-muted-foreground">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {ag.status !== 'finalizado' && ag.status !== 'cancelado' && (
                        <button title="Finalizar" onClick={() => updateStatus(ag.id, 'finalizado')}
                          className="p-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition-colors text-muted-foreground">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {ag.status !== 'cancelado' && (
                        <button title="Cancelar" onClick={() => updateStatus(ag.id, 'cancelado')}
                          className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-muted-foreground">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-dashed border-sidebar-border p-4 rounded-xl flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Disponível</span>
                    <button
                      onClick={() => { setNovoAg({ ...novoAg, date: dataSelecionada, time: h }); setModalNovo(true); }}
                      className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">
                      Reservar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal aberto={modalNovo} onFechar={() => { setModalNovo(false); setErroForm(''); }} titulo="Novo Agendamento">
        <div className="space-y-5">
          {erroForm && <p className="text-red-400 text-xs font-bold bg-red-400/10 px-4 py-3 rounded-xl">{erroForm}</p>}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nome da Cliente *</label>
            <input className={inputClass} placeholder="Nome completo..." value={novoAg.clientName} onChange={e => setNovoAg({ ...novoAg, clientName: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Procedimento *</label>
            <input className={inputClass} placeholder="Ex: Volume Russo..." value={novoAg.serviceName} onChange={e => setNovoAg({ ...novoAg, serviceName: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tipo *</label>
            <select className={inputClass} value={novoAg.tipoServico} onChange={e => setNovoAg({ ...novoAg, tipoServico: e.target.value })}>
              <option value="cilios_completo">Aplicação Completa (3h)</option>
              <option value="manutencao">Manutenção (1h30)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Data *</label>
              <input type="date" className={inputClass} value={novoAg.date} min={hoje}
                onChange={e => setNovoAg({ ...novoAg, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Horário *</label>
              <input type="time" className={inputClass} value={novoAg.time}
                onChange={e => setNovoAg({ ...novoAg, time: e.target.value })} />
            </div>
          </div>
          <button onClick={handleSalvar} className="w-full bg-primary text-white h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary/80 transition-all mt-2">
            Confirmar Agendamento
          </button>
        </div>
      </Modal>
    </div>
  );
}
