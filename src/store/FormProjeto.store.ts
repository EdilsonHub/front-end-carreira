import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IProjeto } from "../interfaces/IProjeto";

interface IState {
  nomeFormulario: string;
  visibilidade: boolean;
  dados: IProjeto;
}

const initialState: IState = {
  nomeFormulario: "",
  visibilidade: false,
  dados: {
    idProjetoSuperior: "",
    id: "",
    nome: "",
    custoPrevisto: "",
    descricao: "",
    dataLimite: "",
    agenda: {
      inicio: "",
      fim: "",
    },
    tempoPrevisto: {
      meses: "",
      dias: "",
      horas: "",
      minutos: "",
    },
  },
};

const formProjeto = createSlice({
  name: "formProjeto",
  initialState: initialState,
  reducers: {
    setIdProjeto(state, action: PayloadAction<string>) {
      state.dados.id = action.payload;
    },
    setIdProjetoSuperior(state, action: PayloadAction<string>) {
      state.dados.idProjetoSuperior = action.payload;
    },
    setVisibilidade(state, action: PayloadAction<boolean>) {
      state.visibilidade = action.payload;
    },
    setFormulario(state, action: PayloadAction<IProjeto>) {
      state.dados = action.payload;
    },
    setNomeFormulario(state, action: PayloadAction<string>) {
      state.nomeFormulario = action.payload;
    },
    clearDadosFormulario(state) {
      state.dados = {
        idProjetoSuperior: state.dados.idProjetoSuperior,
        id: "",
        nome: "",
        custoPrevisto: "",
        descricao: "",
        dataLimite: "",
        agenda: {
          inicio: "",
          fim: "",
        },
        tempoPrevisto: {
          meses: "",
          dias: "",
          horas: "",
          minutos: "",
        },
      };
    },
  },
});

export const {
  setIdProjeto,
  setIdProjetoSuperior,
  setVisibilidade,
  setFormulario,
  setNomeFormulario,
  clearDadosFormulario,
} = formProjeto.actions;
export const selectData = (state: RootState) => state.formProjeto;
export default formProjeto.reducer;
