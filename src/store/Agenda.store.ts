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
        addAgenda(state, action: PayloadAction<IAgenda>) {
            state.dados.push(action.payload);
        }
    }
});

export const { addAgenda } = agendasSlice.actions;
export const selectAgendas = (state: RootState) => state.agendas;
export default agendasSlice.reducer;