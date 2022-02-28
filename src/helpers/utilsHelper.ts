import { IProjeto as IProjetoBack } from "./../interfaces/responsesHttp/IProjeto";
import { IProjeto as IProjetoFront } from "../interfaces/IProjeto";
import { converterDataAmericano, converterDataBrasileira } from "./dateHelper";
import { converterMoedaBrasileira } from "./moneyHelper";

export function defaultValueCreate<TypeData, TypeValueDefault>(
  defaultValue: TypeValueDefault
) {
  return (dado: TypeData) => {
    if (!dado) {
      return defaultValue;
    }
    return dado;
  };
}

export function convertProjetoFrontEndToBackEnd(dados: IProjetoFront) {
  const custoPrevistoArray = ((dados.custoPrevisto + "").split("R$ ")[1] || "")
    .replaceAll(".", "")
    .split(",");

  const custoPrevisto =
    custoPrevistoArray.length > 1
      ? custoPrevistoArray.join("")
      : custoPrevistoArray.join("") + "00";

  const defaultTempoPrevisto = defaultValueCreate<string, number>(0);
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    id_projeto_pai: dados.idProjetoSuperior,
    meses_previstos: defaultTempoPrevisto(dados.tempoPrevisto.meses),
    dias_previstos: defaultTempoPrevisto(dados.tempoPrevisto.dias),
    horas_previstas: defaultTempoPrevisto(dados.tempoPrevisto.horas),
    minutos_previstos: defaultTempoPrevisto(dados.tempoPrevisto.minutos),
    custo_previsto: custoPrevisto,
    data_limite: converterDataAmericano(dados.dataLimite),
    // local_de_realizacao_previsto: null
  };
}

export function convertProjetoBackEndToFrontEnd(dados: IProjetoBack) {
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    custoPrevisto: converterMoedaBrasileira(dados.custo_previsto),
    dataLimite: converterDataBrasileira(dados.data_limite),
    tempoPrevisto: {
      meses: dados.meses_previstos + "",
      dias: dados.dias_previstos + "",
      horas: dados.horas_previstas + "",
      minutos: dados.minutos_previstos + "",
    },
    agenda: {
      inicio: "",
      fim: "",
    },
    idProjetoSuperior: (dados.id_projeto_pai || "") + "",
    id: dados.id + "",
  };
}
