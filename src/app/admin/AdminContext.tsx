
'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

// ─── TIPOS ───
export type Status = 'pendente' | 'confirmado' | 'remarcado' | 'cancelado' | 'finalizado';
export interface Servico { id: string; nome: string; valor: number; duracao: number; descricao: string; foto: null; ativo: boolean; }
export interface Cliente { id: string; nome: string; telefone: string; indicacoes: number; cupons: string[]; etiquetas: string[]; }
export interface Agendamento { id: string; clientName: string; serviceName: string; date: string; time: string; status: Status; tipoServico?: string; duration?: number; }
export interface Cupom { id: string; nome: string; tipo: 'percentual' | 'fixo'; valor: number; ativo: boolean; }
export interface AppState { servicos: Servico[]; clientes: Cliente[]; agendamentos: Agendamento[]; cupons: Cupom[]; horariosBase: string[]; }

// ─── ESTADO INICIAL ───
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
  horariosBase: ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'],
};

// ─── REDUCER ───
function reducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'SYNC_AGENDAMENTOS':
      return { ...state, agendamentos: action.payload };
    case 'CRIAR_CLIENTE':
      return { ...state, clientes: [...state.clientes, { id: `c_${Date.now()}`, ...action.payload, indicacoes: 0, cupons: [], etiquetas: ['Nova cliente'] }] };
    case 'EDITAR_CLIENTE':
      return { ...state, clientes: state.clientes.map(c => c.id === action.payload.id ? { ...c, nome: action.payload.nome, telefone: action.payload.telefone } : c) };
    case 'EXCLUIR_CLIENTE':
      return { ...state, clientes: state.clientes.filter(c => c.id !== action.payload.id) };
    case 'CRIAR_CUPOM':
      return { ...state, cupons: [...state.cupons, { id: `cup_${Date.now()}`, ...action.payload, ativo: true }] };
    default:
      return state;
  }
}

interface AppContextType { state: AppState; dispatch: React.Dispatch<any>; }
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;
    
    // Sincronização em tempo real com Firestore
    const q = query(collection(firestore, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Agendamento[];
      dispatch({ type: 'SYNC_AGENDAMENTOS', payload: appointments });
    });

    return () => unsubscribe();
  }, [firestore]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AppContext);
  if (!ctx) return { state: ESTADO_INICIAL, dispatch: () => {} };
  return ctx;
}
