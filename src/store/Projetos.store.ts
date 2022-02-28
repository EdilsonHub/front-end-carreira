import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IProjeto } from "../interfaces/IProjeto";
import { getProjetosTeste } from "./dadosTeste";

// import { open } from './SwipeableDrawer.store';
// import { store } from '../store';

interface IState {
  dados: IProjeto[];
}

const initialState: IState = {
  dados: [], //getProjetosTeste(),//[],
};

const projetosSlice = createSlice({
  name: "projetos",
  initialState: initialState,
  reducers: {
    addProjeto(state, action: PayloadAction<IProjeto>) {
      if (
        state.dados.length === 0 ||
        state.dados.find((n) => n.id === action.payload.id) === undefined
      ) {
        state.dados.push(action.payload);
      }
    },
    atualizarProjeto(state, action: PayloadAction<IProjeto>) {
      state.dados.forEach((projeto) => {
        if (projeto.id === action.payload.id) {
          const index = state.dados.indexOf(projeto);
          state.dados[index] = {
            ...action.payload,
            idProjetoSuperior: state.dados[index].idProjetoSuperior,
          };
        }
      });
    },
    removeProjeto(state, action: PayloadAction<string>) {
      if (
        state.dados.filter((n) => n.idProjetoSuperior === action.payload)
          .length === 0
      )
        state.dados.forEach((projeto) => {
          if (projeto.id === action.payload) {
            const index = state.dados.indexOf(projeto);
            state.dados.splice(index, 1);
          }
        });
    },
    setTrueConcluido(state, action: PayloadAction<string>) {
      state.dados.forEach((projeto) => {
        if (projeto.id === action.payload) {
          projeto.concluido = true;
        }
      });
    },
    setFalseConcluido(state, action: PayloadAction<string>) {
      state.dados.forEach((projeto) => {
        if (projeto.id === action.payload) {
          projeto.concluido = false;
        }
      });
    },
  },
});

export type { IProjeto as IProjeto };
export const {
  addProjeto,
  atualizarProjeto,
  removeProjeto,
  setTrueConcluido,
  setFalseConcluido,
} = projetosSlice.actions;
export const selectProjetos = (state: RootState) => state.projetos;
export default projetosSlice.reducer;
