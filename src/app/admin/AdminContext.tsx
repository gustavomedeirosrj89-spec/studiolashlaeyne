'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { format, addDays } from 'date-fns';

// ─── TIPOS ───
export type Status = 'confirmado' | 'remarcado' | 'cancelado' | 'finalizado';
export interface Servico { id: string; nome: string; valor: number; duracao: number; descricao: string; foto: null; ativo: boolean; }
export interface Cliente { id: string; nome: string; telefone: string; indicacoes: number; cupons: string[]; etiquetas: string[]; }
export interface Agendamento { id: string; clienteId: string; servicoId: string; data: string; horario: string; status: Status; }
export interface Cupom { id: string; nome: string; tipo: 'percentual' | 'fixo'; valor: number; ativo: boolean; }
export interface AppState { servicos: Servico[]; clientes: Cliente[]; agendamentos: Agendamento[]; cupons: Cupom[]; horariosBase: string[]; }

// ─── ESTADO INICIAL ───
const ESTADO_INICIAL: AppState = {
  servicos: [
    { id: 's1', nome: 'Volume Russo',  valor: 180, duracao: 120, descricao: 'Fios 0.05 a 0.07 em leque', foto: null, ativo: true },
    { id: 's2', nome: 'Fio a Fio',     valor: 120, duracao: 90,  descricao: 'Clássico e natural',        foto: null, ativo: true },
    { id: 's3', nome: 'Manutenção',    valor: 80,  duracao: 60,  descricao: 'Retoque a cada 3 semanas',  foto: null, ativo: true },
    { id: 's4', nome: 'Mega Volume',   valor: 220, duracao: 150, descricao: 'Volume máximo dramático',   foto: null, ativo: true },
  ],
  clientes: [
    { id: 'c1', nome: 'Ana Paula',    telefone: '85999990001', indicacoes: 3, cupons: ['INDIQUEGANHE'], etiquetas: ['VIP', 'Indicadora'] },
    { id: 'c2', nome: 'Beatriz Lima', telefone: '85999990002', indicacoes: 1, cupons: [],               etiquetas: ['Nova cliente'] },
    { id: 'c3', nome: 'Camila Souza', telefone: '85999990003', indicacoes: 5, cupons: ['VIP20'],        etiquetas: ['Fiel', 'VIP'] },
  ],
  agendamentos: [
    { id: 'ag1', clienteId: 'c1', servicoId: 's1', data: format(new Date(), 'yyyy-MM-dd'), horario: '09:00', status: 'confirmado' },
    { id: 'ag2', clienteId: 'c2', servicoId: 's3', data: format(new Date(), 'yyyy-MM-dd'), horario: '11:00', status: 'confirmado' },
    { id: 'ag3', clienteId: 'c3', servicoId: 's2', data: format(addDays(new Date(), -1), 'yyyy-MM-dd'), horario: '14:00', status: 'finalizado' },
  ],
  cupons: [
    { id: 'cup1', nome: 'INDIQUEGANHE', tipo: 'percentual', valor: 15, ativo: true },
    { id: 'cup2', nome: 'VIP20',        tipo: 'fixo',       valor: 20, ativo: true },
  ],
  horariosBase: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
};

// ─── REDUCER ───
function reducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'CRIAR_AGENDAMENTO':
      return { ...state, agendamentos: [...state.agendamentos, { id: `ag_${Date.now()}`, ...action.payload, status: 'confirmado' as Status }] };
    case 'REMARCAR_AGENDAMENTO':
      return { ...state, agendamentos: state.agendamentos.map(ag => ag.id === action.payload.id ? { ...ag, data: action.payload.novaData, horario: action.payload.novoHorario, status: 'remarcado' as Status } : ag) };
    case 'CANCELAR_AGENDAMENTO':
      return { ...state, agendamentos: state.agendamentos.map(ag => ag.id === action.payload.id ? { ...ag, status: 'cancelado' as Status } : ag) };
    case 'FINALIZAR_AGENDAMENTO':
      return { ...state, agendamentos: state.agendamentos.map(ag => ag.id === action.payload.id ? { ...ag, status: 'finalizado' as Status } : ag) };
    case 'CRIAR_SERVICO':
      return { ...state, servicos: [...state.servicos, { id: `s_${Date.now()}`, ...action.payload, foto: null, ativo: true }] };
    case 'EDITAR_SERVICO':
      return { ...state, servicos: state.servicos.map(s => s.id === action.payload.id ? { ...s, ...action.payload } : s) };
    case 'TOGGLE_SERVICO':
      return { ...state, servicos: state.servicos.map(s => s.id === action.payload.id ? { ...s, ativo: !s.ativo } : s) };
    case 'EXCLUIR_SERVICO':
      return { ...state, servicos: state.servicos.filter(s => s.id !== action.payload.id) };
    case 'CRIAR_CLIENTE':
      return { ...state, clientes: [...state.clientes, { id: `c_${Date.now()}`, ...action.payload, indicacoes: 0, cupons: [], etiquetas: ['Nova cliente'] }] };
    case 'ADICIONAR_INDICACAO': {
      return {
        ...state,
        clientes: state.clientes.map(c => {
          if (c.id !== action.payload.clienteId) return c;
          const novasIndicacoes = c.indicacoes + 1;
          const novosCupons = [...c.cupons];
          const novasEtiquetas = [...c.etiquetas];
          // Lógica de recompensa: Novo cupom a cada 3 indicações
          if (novasIndicacoes % 3 === 0) novosCupons.push(`BONUS_${novasIndicacoes}`);
          // Etiqueta VIP após 5 indicações
          if (novasIndicacoes >= 5 && !novasEtiquetas.includes('VIP')) novasEtiquetas.push('VIP');
          if (!novasEtiquetas.includes('Indicadora')) novasEtiquetas.push('Indicadora');
          return { ...c, indicacoes: novasIndicacoes, cupons: novosCupons, etiquetas: novasEtiquetas };
        }),
      };
    }
    case 'CRIAR_CUPOM':
      return { ...state, cupons: [...state.cupons, { id: `cup_${Date.now()}`, ...action.payload, ativo: true }] };
    case 'TOGGLE_CUPOM':
      return { ...state, cupons: state.cupons.map(c => c.id === action.payload.id ? { ...c, ativo: !c.ativo } : c) };
    default:
      return state;
  }
}

// ─── CONTEXT ───
interface AppContextType { state: AppState; dispatch: React.Dispatch<any>; }
const AppContext = createContext<AppContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  return ctx;
}