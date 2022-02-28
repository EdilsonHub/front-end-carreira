import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertProjetoFrontEndToBackEnd,
  convertProjetoBackEndToFrontEnd,
} from "../helpers/utilsHelper";
import api from "../services/api";
import {
  setIdProjeto,
  setIdProjetoSuperior,
  setVisibilidade,
  setNomeFormulario,
  clearDadosFormulario,
} from "../store/FormProjeto.store";
import {
  addProjeto,
  atualizarProjeto,
  selectProjetos,
} from "../store/Projetos.store";

import { IProjeto as IProjetoBackEnd } from "./../interfaces/responsesHttp/IProjeto";
import { IProjeto as IProjetoFrontEnd } from "../interfaces/IProjeto";

export function useProjeto() {
  const { dados } = useSelector(selectProjetos);
  const dispatch = useDispatch();

  const abrirFormularioProjeto = () => {
    _abrirFormularioProjeto(dispatch);
  };

  const salvarProjetoBancoDados = (projeto: IProjetoFrontEnd) => {
    _salvarProjetoBancoDados(projeto, dispatch);
  };

  const atualizarProjetoBancoDados = (
    id: string,
    projeto: IProjetoFrontEnd
  ) => {
    _atualizarProjetoBancoDados(id, projeto, dispatch);
  };

  const buscarProjetosApi = () => {
    buscarProjetosNivelZeroBancoDados(dados, dispatch);
  };

  const fecharFormularioProjeto = () => {
    dispatch(setVisibilidade(false));
  };

  const searchProjetosBancoDados = (ids: string[]) => {
    // const idsEncontratosFrontEnd = dados
    //   .filter((n) => ids.includes(n.id))
    //   .map((n) => n.id);
    // _searchProjetosBancoDados(
    //   ids
    //     .map((n) => (!idsEncontratosFrontEnd.includes(n) ? n : null))
    //     .filter((n) => n),
    //   dispatch
    // );
    _searchProjetosBancoDados(ids, dispatch);
  };

  return {
    dados,
    abrirFormularioProjeto,
    salvarProjetoBancoDados,
    atualizarProjetoBancoDados,
    buscarProjetosApi,
    fecharFormularioProjeto,
    searchProjetosBancoDados,
  };
}

function _abrirFormularioProjeto(dispatch: Dispatch<any>) {
  dispatch(setIdProjeto(""));
  dispatch(setIdProjetoSuperior(""));
  dispatch(setNomeFormulario(`Cadastrar Novo Projeto`));
  dispatch(setVisibilidade(true));
}

function buscarProjetosNivelZeroBancoDados(
  dados: IProjetoFrontEnd[],
  dispatch: Dispatch<any>
) {
  console.log("buscarProjetosNivelZeroBancoDados");
  if (dados.length === 0) {
    api.get("projeto").then((n) => {
      n.data.data?.forEach((dado: IProjetoBackEnd) => {
        dispatch(addProjeto(convertProjetoBackEndToFrontEnd(dado)));
        dado.filhos.forEach((nn: IProjetoBackEnd) => {
          dispatch(addProjeto(convertProjetoBackEndToFrontEnd(nn)));
        });
      });
    });
  }
}

function _salvarProjetoBancoDados(
  dados: IProjetoFrontEnd,
  dispatch: Dispatch<any>
) {
  api
    .post("projeto", convertProjetoFrontEndToBackEnd(dados))
    .then((n) => {
      dispatch(addProjeto(convertProjetoBackEndToFrontEnd(n.data)));
      dispatch(clearDadosFormulario());
    })
    .catch((e) => console.log({ e }));
}

function _atualizarProjetoBancoDados(
  id: string,
  dados: IProjetoFrontEnd,
  dispatch: Dispatch<any>
) {
  api
    .put(`projeto/${id}`, convertProjetoFrontEndToBackEnd(dados))
    .then((n) => {
      dispatch(atualizarProjeto(convertProjetoBackEndToFrontEnd(n.data)));
      dispatch(setVisibilidade(false));
    })
    .catch((e) => console.log({ e }));
}

function _searchProjetosBancoDados(
  ids: (string | null)[],
  dispatch: Dispatch<any>
) {
  ids.forEach((id) => {
    if (!id) {
      return true;
    }
    api
      .get(`projeto/${id}`)
      .then((n) => {
        dispatch(addProjeto(convertProjetoBackEndToFrontEnd(n.data)));
        n.data.filhos.forEach((dataFilho: IProjetoBackEnd) => {
          dispatch(addProjeto(convertProjetoBackEndToFrontEnd(dataFilho)));
        });
      })
      .catch((e) => console.log({ e }));
  });
}
