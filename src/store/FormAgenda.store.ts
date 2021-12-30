import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

export interface IAgenda { //código repetido
    id: string;
    idAgendaSuperior: string
    nome: string;
    inicio: string;
    fim: string;
}

interface IState {
    visibilidade: boolean;
    dados: IAgenda
} 

const initialState = {
    visibilidade: false,
    dados: {
        id: "",
        idAgendaSuperior: "",
        nome: "",
        inicio: "",
        fim: ""
    }
};

const formAgendaSlice = createSlice({
    name: 'formAgenda',
    initialState: initialState,
    reducers: {
        setVisibilidade (state, action: PayloadAction<boolean>) {
            state.visibilidade = action.payload;
        },
        setIdAgenda (state, action: PayloadAction<string>) {
            state.dados.id = action.payload;
        },
        setIdAgendaSuperior (state, action: PayloadAction<string>) {
            state.dados.idAgendaSuperior = action.payload;
        }
    }
})

export const { setVisibilidade, setIdAgenda, setIdAgendaSuperior } = formAgendaSlice.actions;
export const selectFormAgenda = (state: RootState) => state.formAgenda;
export default formAgendaSlice.reducer;