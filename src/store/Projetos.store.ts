import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'
import { IDadosFormulario } from "../components/Form/FormProjeto";
import { getProjetosTeste } from "./dadosTeste";

// import { open } from './SwipeableDrawer.store';
// import { store } from '../store';

interface IState {
    dados: IDadosFormulario[]
}

const initialState: IState = {
    dados: getProjetosTeste(),//[],
};

const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialState,
    reducers: {
        addProjeto(state, action: PayloadAction<IDadosFormulario>) {
            state.dados.push(action.payload);
        },
        atualizarProjeto(state, action: PayloadAction<IDadosFormulario>) {
            state.dados.forEach(projeto => {
                if (projeto.id === action.payload.id) {
                    const index = state.dados.indexOf(projeto);
                    state.dados[index] = action.payload;
                }
            });
        },
        removeProjeto(state, action: PayloadAction<string>) {
            if (state.dados.filter(n => n.idProjetoSuperior === action.payload).length === 0)

                state.dados.forEach(projeto => {
                    if (projeto.id === action.payload) {
                        const index = state.dados.indexOf(projeto);
                        state.dados.splice(index, 1);
                    }
                });
        }
    }
})

export const { addProjeto, atualizarProjeto, removeProjeto} = projetosSlice.actions;
export const selectProjetos = (state: RootState) => state.projetos;
export default projetosSlice.reducer;