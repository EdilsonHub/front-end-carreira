import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'
import { IDadosFormulario } from "../components/Form/FormProjeto";

interface IState {
    nomeFormulario: string;
    visibilidade: boolean;
    dados: IDadosFormulario;
}

const initialState: IState = {
    nomeFormulario: '',
    visibilidade: false,
    dados: {
        idProjetoSuperior: '',
        id: '',
        nome: '',
        custoPrevisto: '',
        descricao: '',
        dataLimite: '',
        agenda: {
            inicio: '',
            fim: '',
        },
        tempoPrevisto: {
            meses: '',
            dias: '',
            horas: '',
            minutos: ''
        }
    },
};

const formProjeto = createSlice({
    name: 'formProjeto',
    initialState: initialState,
    reducers: {
        setIdProjeto(state, action: PayloadAction<string>) {
            state.dados.id = action.payload;
        },
        setIdProjetoSuperior (state, action: PayloadAction<string>) {
            state.dados.idProjetoSuperior = action.payload;
        },
        setVisibilidade (state, action: PayloadAction<boolean>) {
            state.visibilidade = action.payload;
        },
        setFormulario(state, action: PayloadAction<IDadosFormulario>) {
            state.dados = action.payload;
        },
        setNomeFormulario(state, action: PayloadAction<string>) {
            state.nomeFormulario = action.payload;
        }
    }
})

export const { setIdProjeto, setIdProjetoSuperior, setVisibilidade, setFormulario, setNomeFormulario } = formProjeto.actions;
export const selectData = (state: RootState) => state.formProjeto;
export default formProjeto.reducer;