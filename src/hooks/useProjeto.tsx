import { Dispatch, Fragment, useCallback } from "react";
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

import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";

import { IProjeto as IProjetoBackEnd } from "./../interfaces/responsesHttp/IProjeto";
import { IProjeto as IProjetoFrontEnd } from "../interfaces/IProjeto";
import { IEnqueueSnackbar } from "../interfaces/IEnqueueSnackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function useProjeto() {
  const { dados } = useSelector(selectProjetos);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const alertSnackBar: IEnqueueSnackbar = useCallback(
    (message: SnackbarMessage, option?: OptionsObject | null | undefined) => {
      const defaultOption = {
        action: (key: SnackbarKey | undefined) => (
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => closeSnackbar(key)}
            style={{ color: "#FFF" }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      };
      if (!option) {
        option = defaultOption;
      } else {
        option = { ...defaultOption, ...option };
      }
      return enqueueSnackbar(message, option);
    },
    []
  );

  const cadastrarProjeto = useCallback(() => {
    _abrirFormularioProjeto(dispatch);
  }, []);

  const salvar = useCallback((projeto: IProjetoFrontEnd) => {
    _salvarProjetoBancoDados(projeto, dispatch, alertSnackBar);
  }, []);

  const atualizar = useCallback((id: string, projeto: IProjetoFrontEnd) => {
    _atualizarProjetoBancoDados(id, projeto, dispatch, alertSnackBar);
  }, []);

  const buscarNivelZero = useCallback(() => {
    buscarProjetosNivelZeroBancoDados(dados, dispatch, alertSnackBar);
  }, [dados]);

  const fechar = useCallback(() => {
    dispatch(setVisibilidade(false));
  }, []);

  const buscar = useCallback((ids: string[]) => {
    _searchProjetosBancoDados(ids, dispatch, alertSnackBar);
  }, []);

  const remover = useCallback((idProjeto: string) => {
    _deleteProjetoBancoDados(idProjeto, dados, dispatch, alertSnackBar);
  }, []);

  const editar = useCallback((idProjeto: string, nomeProjeto: string) => {
    _abrirFormularioEdicaoProjeto(idProjeto, nomeProjeto, dispatch);
  }, []);

  const cadastrarSubProjeto = useCallback(
    (idProjeto: string, nomeProjeto: string) => {
      _abriFormularioSubProjeto(idProjeto, nomeProjeto, dispatch);
    },
    []
  );

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
  dispatch: Dispatch<any>,
  alertSnackBar: IEnqueueSnackbar
) {
  if (dados.length === 0) {
    api
      .get("projeto")
      .then((n) => {
        n.data.data?.forEach((dado: IProjetoBackEnd) => {
          dispatch(addProjeto(convertProjetoBackEndToFrontEnd(dado)));
          dado.filhos.forEach((nn: IProjetoBackEnd) => {
            dispatch(addProjeto(convertProjetoBackEndToFrontEnd(nn)));
          });
        });
      })
      .catch(snackbarResponseError(alertSnackBar));
  }
}

function _salvarProjetoBancoDados(
  dados: IProjetoFrontEnd,
  dispatch: Dispatch<any>,
  alertSnackBar: IEnqueueSnackbar
) {
  api
    .post("projeto", convertProjetoFrontEndToBackEnd(dados))
    .then((n) => {
      console.log({ n });
      dispatch(addProjeto(convertProjetoBackEndToFrontEnd(n.data)));
      dispatch(clearDadosFormulario());
      alertSnackBar(`Projeto ${n.data.nome} salvo sucesso!`, {
        variant: "success",
      });
    })
    .catch(snackbarResponseError(alertSnackBar));
}

function _atualizarProjetoBancoDados(
  id: string,
  dados: IProjetoFrontEnd,
  dispatch: Dispatch<any>,
  alertSnackBar: IEnqueueSnackbar
) {
  api
    .put(`projeto/${id}`, convertProjetoFrontEndToBackEnd(dados))
    .then((n) => {
      dispatch(atualizarProjeto(convertProjetoBackEndToFrontEnd(n.data)));
      dispatch(setVisibilidade(false));
      alertSnackBar(`Projeto ${n.data.nome} atualizado sucesso!`, {
        variant: "success",
      });
    })
    .catch(snackbarResponseError(alertSnackBar));
}

function _searchProjetosBancoDados(
  ids: (string | null)[],
  dispatch: Dispatch<any>,
  alertSnackBar: IEnqueueSnackbar
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
      .catch(snackbarResponseError(alertSnackBar));
  });
}

function _deleteProjetoBancoDados(
  idProjeto: string,
  dados: IProjetoFrontEnd[],
  dispatch: Dispatch<any>,
  alertSnackBar: IEnqueueSnackbar
) {
  const projeto = dados.find((n) => n.id === idProjeto);
  api
    .delete(`projeto/${idProjeto}`)
    .then((n) => {
      dispatch(removeProjeto(idProjeto));
      alertSnackBar(`O projeto ${projeto?.nome} removido com sucesso!`, {
        variant: "success",
      });
    })
    .catch(snackbarResponseError(alertSnackBar));
  return true;
}

function snackbarResponseError(alertSnackBar: IEnqueueSnackbar) {
  return (e: any) => {
    const bar = (error: string[]) => {
      if (!error || !Array.isArray(error)) {
        return false;
      }
      error.forEach((mensagemError: string) => {
        alertSnackBar(mensagemError, {
          variant: "error",
        });
      });
      return true;
    };

    const error = e?.response?.data?.error;
    const errors = e?.response?.data?.errors;

    if (!bar(error)) {
      for (const prop in errors) {
        bar(errors[prop]);
      }
    }
  };
}
