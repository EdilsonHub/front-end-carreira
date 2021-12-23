import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, AppThunk, RootState } from '../store'
import { IDadosFormulario } from "../components/Form/FormProjeto";

import { open } from './SwipeableDrawer.store';
import { store } from '../store';

export interface IcontrolsForm {
    visibilidade: boolean;
    dados: IDadosFormulario;
    projetos: IDadosFormulario[]
}

const initialState: IcontrolsForm = {
    visibilidade: false,
    projetos: [],
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
        openNovo(state, action: PayloadAction<string | undefined>) {
            state.dados.idProjetoSuperior = action.payload;
            state.visibilidade = true;
        },
        showFormulario(state, action: PayloadAction<boolean>) {
            state.visibilidade = action.payload;
        },
        salvar(state, action: PayloadAction<IDadosFormulario>) {
            const { dados: { id, idProjetoSuperior }} = state; 
            state.visibilidade = false;
            state.dados = action.payload;
            state.dados.id = id;
            state.dados.idProjetoSuperior = idProjetoSuperior;

            state.projetos.push(state.dados);
        }
        // openEdit
        // delete
        // openAgendaEdit
        // concluirProjeto
    }
})

export const { openNovo, showFormulario, salvar } = formProjeto.actions;
export const selectData = (state: RootState) => state.formProjeto;
export default formProjeto.reducer;