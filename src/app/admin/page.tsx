
'use client';

import React, { useState, useReducer, useContext, createContext, useMemo } from 'react';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Ticket, 
  TrendingUp, 
  DollarSign, 
  UserPlus,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * @fileOverview Painel Administrativo Mestre - LAEYNE STUDIO LASH
 * Sistema de gestão de luxo com estado em memória e design editorial.
 */

// ─── ESTADO INICIAL ───
const ESTADO_INICIAL = {
  abaAtiva: 'agendamentos',
  servicos: [
    { id: 's1', nome: 'Volume Russo', valor: 180, duracao: 120, descricao: 'Fios 0.05 a 0.07 em leque', foto: null, ativo: true },
    { id: 's2', nome: 'Fio a Fio', valor: 120, duracao: 90, descricao: 'Clássico e natural', foto: null, ativo: true },
    { id: 's3', nome: 'Manutenção', valor: 80, duracao: 60, descricao: 'Retoque a cada 3 semanas', foto: null, ativo: true },
    { id: 's4', nome: 'Mega Volume', valor: 220, duracao: 150, descricao: 'Volume máximo dramático', foto: null, ativo: true },
  ],
  clientes: [
    { id: 'c1', nome: 'Ana Paula', telefone: '85999990001', indicacoes: 3, cupons: ['INDIQUEGANHE'], etiquetas: ['VIP', 'Indicadora'] },
    { id: 'c2', nome: 'Beatriz Lima', telefone: '85999990002', indicacoes: 1, cupons: [], etiquetas: ['Nova cliente'] },
    { id: 'c3', nome: 'Camila Souza', telefone: '85999990003', indicacoes: 5, cupons: ['VIP20'], etiquetas: ['Fiel', 'VIP'] },
  ],
  agendamentos: [
    { id: 'ag1', clienteId: 'c1', servicoId: 's1', data: format(new Date(), 'yyyy-MM-dd'), horario: '09:00', status: 'confirmado' },
    { id: 'ag2', clienteId: 'c2', servicoId: 's3', data: format(new Date(), 'yyyy-MM-dd'), horario: '11:00', status: 'confirmado' },
    { id: 'ag3', clienteId: 'c3', servicoId: 's2', data: format(addDays(new Date(), -1), 'yyyy-MM-dd'), horario: '14:00', status: 'finalizado' },
  ],
  cupons: [
    { id: 'cup1', nome: 'INDIQUEGANHE', tipo: 'percentual', valor: 15, ativo: true },
    { id: 'cup2', nome: 'VIP20', tipo: 'fixo', valor: 20, ativo: true },
  ],
  horariosBase: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
};

// ─── REDUCER ───
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_ABA':
      return { ...state, abaAtiva: action.payload.aba };
    
    case 'CRIAR_AGENDAMENTO':
      return { 
        ...state, 
        agendamentos: [...state.agendamentos, { id: `ag_${Date.now()}`, ...action.payload, status: 'confirmado' }] 
      };

    case 'REMARCAR_AGENDAMENTO':
      return {
        ...state,
        agendamentos: state.agendamentos.map((ag: any) => 
          ag.id === action.payload.id ? { ...ag, data: action.payload.novaData, horario: action.payload.novoHorario, status: 'remarcado' } : ag
        )
      };

    case 'CANCELAR_AGENDAMENTO':
      return {
        ...state,
        agendamentos: state.agendamentos.map((ag: any) => 
          ag.id === action.payload.id ? { ...ag, status: 'cancelado' } : ag
        )
      };

    case 'FINALIZAR_AGENDAMENTO':
      return {
        ...state,
        agendamentos: state.agendamentos.map((ag: any) => 
          ag.id === action.payload.id ? { ...ag, status: 'finalizado' } : ag
        )
      };

    case 'CRIAR_SERVICO':
      return { ...state, servicos: [...state.servicos, { id: `s_${Date.now()}`, ...action.payload, ativo: true }] };

    case 'EDITAR_SERVICO':
      return {
        ...state,
        servicos: state.servicos.map((s: any) => s.id === action.payload.id ? { ...s, ...action.payload } : s)
      };

    case 'TOGGLE_SERVICO':
      return {
        ...state,
        servicos: state.servicos.map((s: any) => s.id === action.payload.id ? { ...s, ativo: !s.ativo } : s)
      };

    case 'EXCLUIR_SERVICO':
      return { ...state, servicos: state.servicos.filter((s: any) => s.id !== action.payload.id) };

    case 'CRIAR_CLIENTE':
      return { 
        ...state, 
        clientes: [...state.clientes, { id: `c_${Date.now()}`, ...action.payload, indicacoes: 0, cupons: [], etiquetas: ['Nova cliente'] }] 
      };

    case 'ADICIONAR_INDICACAO': {
      const novasClientes = state.clientes.map((c: any) => {
        if (c.id === action.payload.clienteId) {
          const novasIndicacoes = c.indicacoes + 1;
          const novosCupons = [...c.cupons];
          const novasEtiquetas = [...c.etiquetas];

          if (novasIndicacoes % 3 === 0) novosCupons.push(`BÔNUS_${novasIndicacoes}`);
          if (novasIndicacoes >= 5 && !novasEtiquetas.includes('VIP')) novasEtiquetas.push('VIP');
          if (novasIndicacoes >= 1 && !novasEtiquetas.includes('Indicadora')) novasEtiquetas.push('Indicadora');

          return { ...c, indicacoes: novasIndicacoes, cupons: novosCupons, etiquetas: novasEtiquetas };
        }
        return c;
      });
      return { ...state, clientes: novasClientes };
    }

    case 'CRIAR_CUPOM':
      return { ...state, cupons: [...state.cupons, { id: `cup_${Date.now()}`, ...action.payload, ativo: true }] };

    case 'TOGGLE_CUPOM':
      return {
        ...state,
        cupons: state.cupons.map((c: any) => c.id === action.payload.id ? { ...c, ativo: !c.ativo } : c)
      };

    default:
      return state;
  }
}

const AppContext = createContext<any>(null);

// ─── COMPONENTES AUXILIARES ───

function Modal({ aberto, onFechar, titulo, children }: any) {
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="bg-[#141414] border border-[#2A2A2A] rounded-[2rem] p-8 w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline text-2xl text-[#C9A84C] font-semibold">{titulo}</h2>
          <button onClick={onFechar} className="text-[#8A7A6A] hover:text-[#C9A84C] transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description }: any) {
  return (
    <div className="bg-[#141414] border border-[#2A2A2A] p-6 rounded-2xl space-y-2 hover:border-[#C9A84C] transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <p className="text-[#8A7A6A] text-[10px] uppercase font-bold tracking-widest">{title}</p>
        <div className="p-2 bg-[#C9A84C]/10 rounded-lg text-[#C9A84C] group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-headline text-[#C9A84C] font-bold">{value}</p>
      <p className="text-[10px] text-[#8A7A6A] uppercase tracking-tighter italic">{description}</p>
    </div>
  );
}

// ─── ABAS ───

function AbaAgendamentos() {
  const { state, dispatch } = useContext(AppContext);
  const [dataSelecionada, setDataSelecionada] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [modalNovo, setModalNovo] = useState(false);
  const [novoAg, setNovoAg] = useState({ clienteId: '', servicoId: '', data: format(new Date(), 'yyyy-MM-dd'), horario: '' });

  const agendamentosDoDia = state.agendamentos.filter((ag: any) => ag.data === dataSelecionada && ag.status !== 'cancelado');
  const horariosOcupados = agendamentosDoDia.map((ag: any) => ag.horario);
  const horariosLivres = state.horariosBase.filter((h: string) => !horariosOcupados.includes(h));

  const handleSalvar = () => {
    if (!novoAg.clienteId || !novoAg.servicoId || !novoAg.horario) return alert('Preencha tudo!');
    dispatch({ type: 'CRIAR_AGENDAMENTO', payload: novoAg });
    setModalNovo(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-4xl text-[#F5F0EB]">Agenda <span className="text-[#C9A84C] italic">Editorial</span></h1>
        <button 
          onClick={() => setModalNovo(true)}
          className="bg-[#C9A84C] text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-[#E8C97A] transition-all"
        >
          <Plus className="w-4 h-4" /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-xl text-[#C9A84C]">Calendário</h3>
            <div className="flex gap-2">
               <button className="p-1 hover:text-[#C9A84C]"><ChevronLeft className="w-4 h-4" /></button>
               <button className="p-1 hover:text-[#C9A84C]"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#8A7A6A] font-bold mb-4">
            {['D','S','T','Q','Q','S','S'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {eachDayOfInterval({ 
              start: startOfMonth(parseISO(dataSelecionada)), 
              end: endOfMonth(parseISO(dataSelecionada)) 
            }).map((day, i) => {
              const iso = format(day, 'yyyy-MM-dd');
              const isSelected = iso === dataSelecionada;
              const isToday = isSameDay(day, new Date());
              return (
                <button 
                  key={i} 
                  onClick={() => setDataSelecionada(iso)}
                  className={`aspect-square rounded-lg text-xs font-semibold transition-all ${
                    isSelected ? 'bg-[#C9A84C] text-black' : isToday ? 'border border-[#C9A84C] text-[#C9A84C]' : 'hover:bg-[#2A2A2A] text-[#8A7A6A]'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <p className="text-[#8A7A6A] text-[10px] uppercase font-bold tracking-[0.2em]">Horários para {format(parseISO(dataSelecionada), "dd 'de' MMMM", { locale: ptBR })}</p>
          {state.horariosBase.map((h: string) => {
            const ag = agendamentosDoDia.find((a: any) => a.horario === h);
            const cliente = ag ? state.clientes.find((c: any) => c.id === ag.clienteId) : null;
            const servico = ag ? state.servicos.find((s: any) => s.id === ag.servicoId) : null;

            return (
              <div key={h} className="flex gap-4 items-center group">
                <span className="text-xs font-bold text-[#8A7A6A] w-12">{h}</span>
                {ag ? (
                  <div className="flex-1 bg-[#141414] border border-[#2A2A2A] p-4 rounded-xl flex justify-between items-center group-hover:border-[#C9A84C] transition-all">
                    <div>
                      <p className="font-bold text-[#F5F0EB]">{cliente?.nome}</p>
                      <p className="text-[10px] text-[#C9A84C] uppercase font-bold tracking-wider">{servico?.nome}</p>
                    </div>
                    <div className="flex gap-2">
                      {ag.status !== 'finalizado' && (
                        <button onClick={() => dispatch({ type: 'FINALIZAR_AGENDAMENTO', payload: { id: ag.id } })} className="p-2 hover:text-[#4CAF7C]"><CheckCircle className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => dispatch({ type: 'CANCELAR_AGENDAMENTO', payload: { id: ag.id } })} className="p-2 hover:text-[#E05252]"><XCircle className="w-4 h-4" /></button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-dashed border-[#2A2A2A] p-4 rounded-xl flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase font-bold text-[#8A7A6A]">Disponível</span>
                    <button 
                      onClick={() => { setNovoAg({ ...novoAg, data: dataSelecionada, horario: h }); setModalNovo(true); }}
                      className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest"
                    >
                      Reservar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal aberto={modalNovo} onFechar={() => setModalNovo(false)} titulo="Novo Agendamento">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Cliente</label>
            <select 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]"
              value={novoAg.clienteId}
              onChange={(e) => setNovoAg({ ...novoAg, clienteId: e.target.value })}
            >
              <option value="">Selecione a cliente...</option>
              {state.clientes.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Serviço</label>
            <select 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]"
              value={novoAg.servicoId}
              onChange={(e) => setNovoAg({ ...novoAg, servicoId: e.target.value })}
            >
              <option value="">Selecione o serviço...</option>
              {state.servicos.filter((s: any) => s.ativo).map((s: any) => <option key={s.id} value={s.id}>{s.nome} - R$ {s.valor}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Data</label>
              <input 
                type="date" 
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
                value={novoAg.data}
                onChange={(e) => setNovoAg({ ...novoAg, data: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Horário</label>
              <select 
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]"
                value={novoAg.horario}
                onChange={(e) => setNovoAg({ ...novoAg, horario: e.target.value })}
              >
                <option value="">Horário...</option>
                {horariosLivres.map((h: string) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <button 
            onClick={handleSalvar}
            className="w-full bg-[#C9A84C] text-black h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#E8C97A] transition-all"
          >
            Confirmar Agendamento
          </button>
        </div>
      </Modal>
    </div>
  );
}

function AbaClientes() {
  const { state, dispatch } = useContext(AppContext);
  const [busca, setBusca] = useState('');
  const [modalNovo, setModalNovo] = useState(false);
  const [novoCli, setNovoCli] = useState({ nome: '', telefone: '' });

  const filtrados = state.clientes.filter((c: any) => c.nome.toLowerCase().includes(busca.toLowerCase()));

  const handleSalvar = () => {
    if (!novoCli.nome || !novoCli.telefone) return alert('Preencha os campos!');
    dispatch({ type: 'CRIAR_CLIENTE', payload: novoCli });
    setModalNovo(false);
    setNovoCli({ nome: '', telefone: '' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-headline text-4xl text-[#F5F0EB]">CRM de <span className="text-[#C9A84C] italic">Clientes</span></h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7A6A]" />
            <input 
              placeholder="Buscar por nome..."
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl pl-12 pr-4 h-12 text-sm text-[#F5F0EB] focus:border-[#C9A84C] transition-all"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setModalNovo(true)}
            className="bg-[#C9A84C] text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Nova
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((cli: any) => (
          <div key={cli.id} className="bg-[#141414] border border-[#2A2A2A] p-6 rounded-2xl space-y-4 hover:border-[#C9A84C] transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-2xl text-[#F5F0EB] font-bold">{cli.nome}</h3>
                <p className="text-xs text-[#8A7A6A]">📱 {cli.telefone}</p>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
                {cli.etiquetas.map((e: string) => (
                  <span key={e} className="px-2 py-0.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[8px] font-bold uppercase rounded-md border border-[#C9A84C]/20">{e}</span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2A2A2A]">
              <div>
                <p className="text-[9px] uppercase font-bold text-[#8A7A6A] tracking-wider">Indicações</p>
                <div className="flex items-center gap-2 text-[#C9A84C] font-bold">
                  <TrendingUp className="w-3 h-3" /> {cli.indicacoes}
                </div>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-[#8A7A6A] tracking-wider">Cupons</p>
                <div className="flex items-center gap-2 text-[#C9A84C] font-bold">
                  <Ticket className="w-3 h-3" /> {cli.cupons.length}
                </div>
              </div>
            </div>

            <button 
              onClick={() => dispatch({ type: 'ADICIONAR_INDICACAO', payload: { clienteId: cli.id } })}
              className="w-full bg-[#2A2A2A] text-[#F5F0EB] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-black transition-all"
            >
              + Registrar Indicação
            </button>
          </div>
        ))}
      </div>

      <div className="pt-12 space-y-4">
        <h3 className="font-headline text-2xl text-[#C9A84C]">Cupons Ativos</h3>
        <div className="flex flex-wrap gap-4">
          {state.cupons.map((cup: any) => (
            <div key={cup.id} className="bg-[#141414] border border-[#2A2A2A] px-4 py-3 rounded-xl flex items-center gap-3">
              <Ticket className="w-4 h-4 text-[#C9A84C]" />
              <span className="font-bold text-sm">{cup.nome}</span>
              <span className="text-[10px] text-[#8A7A6A] uppercase font-bold px-2 py-0.5 bg-[#2A2A2A] rounded">
                {cup.tipo === 'percentual' ? `${cup.valor}%` : `R$ ${cup.valor}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Modal aberto={modalNovo} onFechar={() => setModalNovo(false)} titulo="Cadastro de Cliente">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Nome Completo</label>
            <input 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
              placeholder="Ex: Maria Clara..."
              value={novoCli.nome}
              onChange={(e) => setNovoCli({ ...novoCli, nome: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">WhatsApp</label>
            <input 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
              placeholder="Ex: 859..."
              value={novoCli.telefone}
              onChange={(e) => setNovoCli({ ...novoCli, telefone: e.target.value })}
            />
          </div>
          <button 
            onClick={handleSalvar}
            className="w-full bg-[#C9A84C] text-black h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#E8C97A] transition-all"
          >
            Cadastrar Cliente
          </button>
        </div>
      </Modal>
    </div>
  );
}

function AbaServicos() {
  const { state, dispatch } = useContext(AppContext);
  const [modalNovo, setModalNovo] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [serv, setServ] = useState({ nome: '', valor: 0, duracao: 60, descricao: '' });

  const handleSalvar = () => {
    if (!serv.nome || serv.valor <= 0) return alert('Verifique os campos!');
    if (editId) {
      dispatch({ type: 'EDITAR_SERVICO', payload: { ...serv, id: editId } });
    } else {
      dispatch({ type: 'CRIAR_SERVICO', payload: serv });
    }
    setModalNovo(false);
    setEditId(null);
    setServ({ nome: '', valor: 0, duracao: 60, descricao: '' });
  };

  const abrirEdicao = (s: any) => {
    setEditId(s.id);
    setServ({ nome: s.nome, valor: s.valor, duracao: s.duracao, descricao: s.descricao });
    setModalNovo(true);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-4xl text-[#F5F0EB]">Catálogo de <span className="text-[#C9A84C] italic">Serviços</span></h1>
        <button 
          onClick={() => { setEditId(null); setServ({ nome: '', valor: 0, duracao: 60, descricao: '' }); setModalNovo(true); }}
          className="bg-[#C9A84C] text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.servicos.map((s: any) => (
          <div key={s.id} className={`bg-[#141414] border border-[#2A2A2A] p-6 rounded-2xl space-y-4 hover:border-[#C9A84C] transition-all ${!s.ativo && 'opacity-50'}`}>
             <div className="flex justify-between items-start">
               <h3 className="font-headline text-2xl text-[#C9A84C] font-bold">{s.nome}</h3>
               {!s.ativo && <span className="text-[8px] uppercase font-bold text-[#E05252]">Inativo</span>}
             </div>
             <p className="text-xs text-[#8A7A6A] leading-relaxed line-clamp-2 italic">{s.descricao || 'Sem descrição'}</p>
             <div className="flex justify-between items-end pt-4 border-t border-[#2A2A2A]">
               <div>
                 <p className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-wider">Investimento</p>
                 <p className="text-xl font-bold text-[#F5F0EB]">R$ {s.valor}</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-wider">Duração</p>
                 <div className="flex items-center gap-1 text-[#F5F0EB] text-sm">
                   <Clock className="w-3 h-3 text-[#C9A84C]" /> {s.duracao} min
                 </div>
               </div>
             </div>
             <div className="flex gap-2 pt-2">
               <button onClick={() => abrirEdicao(s)} className="flex-1 bg-[#2A2A2A] hover:bg-[#C9A84C] hover:text-black py-2 rounded-lg text-xs font-bold transition-all"><Edit className="w-4 h-4 mx-auto" /></button>
               <button onClick={() => dispatch({ type: 'TOGGLE_SERVICO', payload: { id: s.id } })} className="flex-1 bg-[#2A2A2A] hover:bg-[#C9A84C] hover:text-black py-2 rounded-lg text-xs font-bold transition-all"><CheckCircle className="w-4 h-4 mx-auto" /></button>
               <button onClick={() => dispatch({ type: 'EXCLUIR_SERVICO', payload: { id: s.id } })} className="flex-1 bg-[#2A2A2A] hover:bg-[#E05252] py-2 rounded-lg text-xs font-bold transition-all"><Trash2 className="w-4 h-4 mx-auto" /></button>
             </div>
          </div>
        ))}
      </div>

      <Modal aberto={modalNovo} onFechar={() => setModalNovo(false)} titulo={editId ? "Editar Serviço" : "Novo Serviço"}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Nome do Procedimento</label>
            <input 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
              value={serv.nome}
              onChange={(e) => setServ({ ...serv, nome: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Valor (R$)</label>
              <input 
                type="number"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
                value={serv.valor}
                onChange={(e) => setServ({ ...serv, valor: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Duração (min)</label>
              <input 
                type="number"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB]" 
                value={serv.duracao}
                onChange={(e) => setServ({ ...serv, duracao: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#8A7A6A] tracking-widest">Descrição Breve</label>
            <textarea 
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-sm text-[#F5F0EB] h-24" 
              value={serv.descricao}
              onChange={(e) => setServ({ ...serv, descricao: e.target.value })}
            />
          </div>
          <button 
            onClick={handleSalvar}
            className="w-full bg-[#C9A84C] text-black h-14 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#E8C97A] transition-all"
          >
            {editId ? 'Salvar Alterações' : 'Criar Serviço'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ─── DASHBOARD ───

function DashboardStats() {
  const { state } = useContext(AppContext);
  const hoje = format(new Date(), 'yyyy-MM-dd');
  const mesAtual = format(new Date(), 'yyyy-MM');

  const stats = useMemo(() => {
    const agMes = state.agendamentos.filter((ag: any) => ag.data.startsWith(mesAtual) && ag.status !== 'cancelado');
    const faturamento = state.agendamentos
      .filter((ag: any) => ag.status === 'finalizado' && ag.data.startsWith(mesAtual))
      .reduce((acc: number, ag: any) => {
        const servico = state.servicos.find((s: any) => s.id === ag.servicoId);
        return acc + (servico?.valor || 0);
      }, 0);

    const ocupadosHoje = state.agendamentos.filter((ag: any) => ag.data === hoje && ag.status !== 'cancelado').length;
    const livresHoje = state.horariosBase.length - ocupadosHoje;

    const contagem: any = {};
    state.agendamentos.forEach((ag: any) => {
      contagem[ag.servicoId] = (contagem[ag.servicoId] || 0) + 1;
    });
    const topId = Object.entries(contagem).sort((a: any, b: any) => b[1] - a[1])[0]?.[0];
    const topServico = state.servicos.find((s: any) => s.id === topId)?.nome || '—';

    return { totalMes: agMes.length, faturamento, livresHoje, topServico };
  }, [state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in duration-700">
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
        title="Horários Livres Hoje" 
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
  );
}

// ─── APP PRINCIPAL ───

export default function App() {
  const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        body {
          background-color: #0A0A0A;
          color: #F5F0EB;
          font-family: 'DM Sans', sans-serif;
        }

        .font-headline {
          font-family: 'Cormorant Garamond', serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
      `}</style>

      <div className="min-h-screen flex flex-col lg:flex-row bg-[#0A0A0A]">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-[#141414] border-b lg:border-r border-[#2A2A2A] p-8 flex flex-col justify-between z-50">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A84C] rounded-xl flex items-center justify-center text-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-headline text-xl uppercase tracking-widest font-bold text-[#F5F0EB]">LAEYNE</h2>
                <p className="text-[8px] uppercase tracking-[0.4em] text-[#C9A84C] font-black">Admin Studio</p>
              </div>
            </div>

            <nav className="space-y-4">
              {[
                { id: 'agendamentos', label: 'Agenda', icon: Calendar },
                { id: 'clientes', label: 'Clientes', icon: Users },
                { id: 'servicos', label: 'Catálogo', icon: Sparkles }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => dispatch({ type: 'SET_ABA', payload: { aba: item.id } })}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    state.abaAtiva === item.id ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/10' : 'text-[#8A7A6A] hover:text-[#C9A84C] hover:bg-[#2A2A2A]'
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:block pt-8 border-t border-[#2A2A2A]">
            <p className="text-[10px] text-[#8A7A6A] uppercase font-bold tracking-widest text-center">v1.0 • LUXURY SAAS</p>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto max-h-screen">
          <DashboardStats />
          
          <div className="max-w-7xl mx-auto">
            {state.abaAtiva === 'agendamentos' && <AbaAgendamentos />}
            {state.abaAtiva === 'clientes' && <AbaClientes />}
            {state.abaAtiva === 'servicos' && <AbaServicos />}
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}
