'use client';

import React, { createContext, useContext, useReducer } from 'react';

// ─── TIPOS ───
export type Status = 'pendente' | 'confirmado' | 'remarcado' | 'cancelado' | 'finalizado';
export interface Servico { id: string; nome: string; valor: number; duracao: number; descricao: string; foto: null; ativo: boolean; }
export interface Cliente { id: string; nome: string; telefone: string; indicacoes: number; cupons: string[]; etiquetas: string[]; }
export interface Agendamento { id: string; clienteId: string; servicoId: string; data: string; horario: string; status: Status; }
export interface Cupom { id: string; nome: string; tipo: 'percentual' | 'fixo'; valor: number; ativo: boolean; }
export interface AppState { servicos: Servico[]; clientes: Cliente[]; agendamentos: Agendamento[]; cupons: Cupom[]; horariosBase: string[]; }

// ─── ESTADO INICIAL ATUALIZADO COM NOVOS PREÇOS ───
const ESTADO_INICIAL: AppState = {
  servicos: [
    { id: 's1', nome: 'Efeito Rímel',      valor: 90,  duracao: 90,  descricao: 'Aplicação individual, elegância discreta.', foto: null, ativo: true },
    { id: 's2', nome: 'Volume Brasileiro', valor: 90,  duracao: 120, descricao: 'Fios em Y, volume e leveza.', foto: null, ativo: true },
    { id: 's3', nome: 'Volume Express',    valor: 75,  duracao: 45,  descricao: 'Versão express mais rápida e leve.', foto: null, ativo: true },
    { id: 's4', nome: 'Efeito Sirena',     valor: 80,  duracao: 100, descricao: 'Natural, delicado e elegante.', foto: null, ativo: true },
    { id: 's5', nome: 'Volume Egípcio',    valor: 90,  duracao: 120, descricao: 'Fios em W, volume tecnológico.', foto: null, ativo: true },
    { id: 's6', nome: 'Fox Eyes',          valor: 110, duracao: 135, descricao: 'Efeito lifting sensual alongado.', foto: null, ativo: true },
    { id: 's7', nome: 'Volume Marrom',     valor: 90,  duracao: 120, descricao: 'Efeito ultra natural e sofisticado.', foto: null, ativo: true },
  ],
  clientes: [],
  agendamentos: [],
  cupons: [],
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
    case 'EDITAR_CLIENTE':
      return { ...state, clientes: state.clientes.map(c => c.id === action.payload.id ? { ...c, nome: action.payload.nome, telefone: action.payload.telefone } : c) };
    case 'EXCLUIR_CLIENTE':
      return {
        ...state,
        clientes: state.clientes.filter(c => c.id !== action.payload.id),
        agendamentos: state.agendamentos.filter(ag => ag.clienteId !== action.payload.id),
      };
    case 'ADICIONAR_INDICACAO':
      return {
        ...state,
        clientes: state.clientes.map(c => {
          if (c.id !== action.payload.clienteId) return c;
          const novasIndicacoes = c.indicacoes + 1;
          const novosCupons = [...c.cupons];
          const novasEtiquetas = [...c.etiquetas];
          if (novasIndicacoes % 3 === 0) novosCupons.push(`BONUS_${novasIndicacoes}`);
          if (novasIndicacoes >= 5 && !novasEtiquetas.includes('VIP')) novasEtiquetas.push('VIP');
          if (!novasEtiquetas.includes('Indicadora')) novasEtiquetas.push('Indicadora');
          return { ...c, indicacoes: novasIndicacoes, cupons: novosCupons, etiquetas: novasEtiquetas };
        }),
      };
    case 'CRIAR_CUPOM':
      return { ...state, cupons: [...state.cupons, { id: `cup_${Date.now()}`, ...action.payload, ativo: true }] };
    case 'TOGGLE_CUPOM':
      return { ...state, cupons: state.cupons.map(c => c.id === action.payload.id ? { ...c, ativo: !c.ativo } : c) };
    case 'EXCLUIR_CUPOM':
      return { ...state, cupons: state.cupons.filter(c => c.id !== action.payload.id) };
    default:
      return state;
  }
}

interface AppContextType { state: AppState; dispatch: React.Dispatch<any>; }
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AppContext);
  if (!ctx) return { state: ESTADO_INICIAL, dispatch: () => {} };
  return ctx;
}
