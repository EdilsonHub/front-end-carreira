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
    nomeFormulario: string;
    visibilidade: boolean;
    dados: IAgenda
}

const initialState: IState = {
    nomeFormulario: "Cadastrar nova agenda",
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
        setVisibilidade(state, action: PayloadAction<boolean>) {
            state.visibilidade = action.payload;
        },
        setIdAgenda(state, action: PayloadAction<string>) {
            state.dados.id = action.payload;
        },
        setIdAgendaSuperior(state, action: PayloadAction<string>) {
            state.dados.idAgendaSuperior = action.payload;
        }, 
        setNomeFormulario(state, action: PayloadAction<string>) {
            state.nomeFormulario = action.payload;
        }
    }
})

export const { setVisibilidade, setIdAgenda, setIdAgendaSuperior, setNomeFormulario } = formAgendaSlice.actions;
export const selectFormAgenda = (state: RootState) => state.formAgenda;
export default formAgendaSlice.reducer;