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
  removeProjeto,
} from "../store/Projetos.store";

import { IProjeto as IProjetoBackEnd } from "./../interfaces/responsesHttp/IProjeto";
import { IProjeto as IProjetoFrontEnd } from "../interfaces/IProjeto";

export function useProjeto() {
  const { dados } = useSelector(selectProjetos);
  const dispatch = useDispatch();

  const cadastrarProjeto = () => {
    _abrirFormularioProjeto(dispatch);
  };

  const salvar = (projeto: IProjetoFrontEnd) => {
    _salvarProjetoBancoDados(projeto, dispatch);
  };

  const atualizar = (id: string, projeto: IProjetoFrontEnd) => {
    _atualizarProjetoBancoDados(id, projeto, dispatch);
  };

  const buscarNivelZero = () => {
    buscarProjetosNivelZeroBancoDados(dados, dispatch);
  };

  const fechar = () => {
    dispatch(setVisibilidade(false));
  };

  const buscar = (ids: string[]) => {
    _searchProjetosBancoDados(ids, dispatch);
  };
  const remover = (idProjeto: string) => {
    _deleteProjetoBancoDados(idProjeto, dispatch);
  };
  const editar = (idProjeto: string, nomeProjeto: string) => {
    _abrirFormularioEdicaoProjeto(idProjeto, nomeProjeto, dispatch);
  };
  const cadastrarSubProjeto = (idProjeto: string, nomeProjeto: string) => {
    _abriFormularioSubProjeto(idProjeto, nomeProjeto, dispatch);
  };

  return {
    formulario: {
      cadastrarProjeto,
      cadastrarSubProjeto,
      editar,
      fechar,
    },
    projetos: {
      dados,
      salvar,
      atualizar,
      buscar,
      remover,
      buscarNivelZero,
    },
  };
}

function _abrirFormularioProjeto(dispatch: Dispatch<any>) {
  dispatch(setIdProjeto(""));
  dispatch(setIdProjetoSuperior(""));
  dispatch(setNomeFormulario(`Cadastrar Novo Projeto`));
  dispatch(setVisibilidade(true));
}

function _abriFormularioSubProjeto(
  idProjeto: string,
  nomeProjeto: string,
  dispatch: Dispatch<any>
) {
  dispatch(setIdProjeto(""));
  dispatch(setIdProjetoSuperior(idProjeto));
  dispatch(setNomeFormulario(`Cadastrar subprojeto: ${nomeProjeto}`));
  dispatch(setVisibilidade(true));
}

function _abrirFormularioEdicaoProjeto(
  idProjeto: string,
  nomeProjeto: string,
  dispatch: Dispatch<any>
) {
  dispatch(setIdProjetoSuperior(""));
  dispatch(setIdProjeto(idProjeto));
  dispatch(setNomeFormulario(`Editar: ${nomeProjeto}`));
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

function _deleteProjetoBancoDados(idProjeto: string, dispatch: Dispatch<any>) {
  api
    .delete(`projeto/${idProjeto}`)
    .then((n) => {
      // if (Array.isArray(n) && n.length === 0) {
      dispatch(removeProjeto(idProjeto));
      // }
    })
    .catch((e) => console.log({ e }));
}
