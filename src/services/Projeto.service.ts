import { DispatchForMiddlewares } from "@reduxjs/toolkit/dist/tsHelpers";
import { Dispatch } from "react";
import { addProjeto } from "../store/Projetos.store";
import { IDadosFormulario } from "./../components/Form/FormProjeto/index";
import api from "./api";

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
      n.data.data.forEach((dados: IDadosProjetoBackEnd) =>
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

//   const addCoisa = () => {
//     dispatch(
//       addProjeto({
//         nome: "dsgfsdfgsdf",
//         descricao: "",
//         custoPrevisto: "",
//         dataLimite: "",
//         tempoPrevisto: {
//           meses: "",
//           dias: "",
//           horas: "",
//           minutos: "",
//         },
//         agenda: {
//           inicio: "",
//           fim: "",
//         },
//         idProjetoSuperior: "",
//         id: "1644788629622",
//       })
//     );

// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data:
// data: Array(1)
// 0:
// custo_previsto: 0
// data_criacao: "2021-10-10 12:30:19"
// descricao: "Projeto para fazer o teste de insersão de testes"
// filhos: []
// id: 42
// id_projeto_pai: null
// local_de_realizacao_previsto: null
// nivel_projeto: 0
// nome: "terceiro verdadeiro projeto filho de 12 5"
// [[Prototype]]: Object
// length: 1
// [[Prototype]]: Array(0)
// links: {first: 'http://localhost/api/projeto?page=1', last: 'http://localhost/api/projeto?page=1', prev: null, next: null}
// meta: {current_page: 1, from: 1, last_page: 1, links: Array(3), path: 'http://localhost/api/projeto', …}
// [[Prototype]]: Object
// headers: {cache-control: 'no-cache, private', content-type: 'application/json'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status: 200
// statusText: "OK"
