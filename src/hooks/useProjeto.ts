import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDadosFormulario } from "../components/Form/FormProjeto";
import api from "../services/api";
import {
  setIdProjeto,
  setIdProjetoSuperior,
  setVisibilidade,
  setNomeFormulario,
} from "../store/FormProjeto.store";
import { addProjeto, selectProjetos } from "../store/Projetos.store";

export function useProjeto() {
  const { dados } = useSelector(selectProjetos);
  const dispatch = useDispatch();

  buscarProjetosNivelZeroBancoDados(dados, dispatch);
  return {
    dados,
    abrirFormularioProjeto: abrirFormularioProjeto(dispatch),
    salvarProjetoBancoDados,
  };
}

function abrirFormularioProjeto(dispatch: Dispatch<any>) {
  return () => {
    dispatch(setIdProjeto(""));
    dispatch(setIdProjetoSuperior(""));
    dispatch(setNomeFormulario(`Cadastrar Novo Projeto`));
    dispatch(setVisibilidade(true));
  };
}

interface IDadosProjetoBackEnd {
  custo_previsto: number;
  data_criacao: string;
  descricao: string;
  filhos: [];
  id: number;
  id_projeto_pai: number;
  local_de_realizacao_previsto: null;
  nivel_projeto: number;
  nome: string;
}

export function buscarProjetosNivelZeroBancoDados(
  dados: IDadosFormulario[],
  dispatch: Dispatch<any>
) {
  if (dados.length === 0) {
    api.get("projeto").then((n) => {
      n.data.data?.forEach((dados: IDadosProjetoBackEnd) =>
        dispatch(addProjeto(convertObjProjetoBackEndFrontEnd(dados)))
      );
    });
  }
}

export function salvarProjetoBancoDados(
  dados: IDadosFormulario,
  dispatch: Dispatch<any>
) {
  api
    .post("projeto", convertProjetoFrontToCreateEndBackEnd(dados))
    .then((n) => {
      dispatch(addProjeto(convertObjProjetoBackEndFrontEnd(n.data)));
    })
    .catch((e) => console.log({ e }));
}

function convertProjetoFrontToCreateEndBackEnd(dados: IDadosFormulario) {
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    id_projeto_pai: dados.idProjetoSuperior,
    // nivel_projeto: null,
    // data_criacao: null,
    // data_inicio_execucao: null,
    // data_conclusao: null,
    // custo_previsto: null,
    // local_de_realizacao_previsto: null
  };
}

function convertObjProjetoBackEndFrontEnd(dados: IDadosProjetoBackEnd) {
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    custoPrevisto: dados.custo_previsto + "",
    dataLimite: "",
    tempoPrevisto: {
      meses: "",
      dias: "",
      horas: "",
      minutos: "",
    },
    agenda: {
      inicio: "",
      fim: "",
    },
    idProjetoSuperior: (dados.id_projeto_pai || "") + "",
    id: dados.id + "",
  };
}
