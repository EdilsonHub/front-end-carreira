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
        }
    }
});

export const { addAgendamentos } = agendamentosSlice.actions;
export const selectAgendamentos = (state: RootState) => state.agendamentos;
export default agendamentosSlice.reducer;