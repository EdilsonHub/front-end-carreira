import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

export interface IAgenda {
    id: string;
    idAgendaSuperior: string
    nome: string;
    inicio: string;
    fim: string;
}

interface IState {
    dados: IAgenda[]
}

const initialState: IState = {
    dados: []
};

const agendasSlice = createSlice({
    name: 'agendas',
    initialState: initialState,
    reducers: {
        addAgenda (state, action: PayloadAction<IAgenda>) {
            state.dados.push(action.payload);
        },
        atualizarAgenda (state, action: PayloadAction<IAgenda>) {
            state.dados.forEach(agenda => {
                if(agenda.id === action.payload.id) {
                const index = state.dados.indexOf(agenda);
                state.dados[index] =  { ...action.payload, idAgendaSuperior: agenda.idAgendaSuperior };
                }
            });
        },
        removerAgenda (state, action: PayloadAction<string>) {
            if(state.dados.filter(n => n.idAgendaSuperior === action.payload).length === 0) {
                state.dados.forEach(agenda => {
                    if (agenda.id === action.payload) {
                        const index = state.dados.indexOf(agenda);
                        state.dados.splice(index, 1);
                    }
                });
            }
        }
    }
});

export const { addAgenda, atualizarAgenda, removerAgenda } = agendasSlice.actions;
export const selectAgendas = (state: RootState) => state.agendas;
export default agendasSlice.reducer;