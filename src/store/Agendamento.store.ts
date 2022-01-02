import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

export interface IAgendamento {
    id: string;
    idAgenda: string;
    idProjeto: string;
    caminhoProjeto?: string;
    nomeProjeto: string;
    inicio: string;
    fim: string;
    projetoConcluido?: boolean;
}

interface IState {
    dados: IAgendamento[]
}

const initialState: IState = {
    dados: []
};

const agendamentosSlice = createSlice({
    name: 'agendamentos',
    initialState: initialState,
    reducers: {
        addAgendamentos (state, action: PayloadAction<IAgendamento>) {
            state.dados.push(action.payload);
        },
        removerAgendamento (state, action: PayloadAction<string>) {
            state.dados.forEach(agendamento => {
                if (agendamento.id === action.payload) {
                    const index = state.dados.indexOf(agendamento);
                    state.dados.splice(index, 1);
                }
            });
        }
    }
});

export const { addAgendamentos, removerAgendamento } = agendamentosSlice.actions;
export const selectAgendamentos = (state: RootState) => state.agendamentos;
export default agendamentosSlice.reducer;