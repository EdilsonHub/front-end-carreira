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
        addProjeto (state, action: PayloadAction<IDadosFormulario>) {
            state.dados.push(action.payload);
        },
        atualizarProjeto(state, action: PayloadAction<IDadosFormulario>) {
            state.dados.forEach(projeto => {
                if(projeto.id === action.payload.id) {
                    const index = state.dados.indexOf(projeto);
                    console.log({actionIdProjetoId: action.payload.id, index});
                    state.dados[index] = action.payload;
                }
            });
        }
    }
})

export const { addProjeto, atualizarProjeto } = projetosSlice.actions;
export const selectProjetos = (state: RootState) => state.projetos;
export default projetosSlice.reducer;