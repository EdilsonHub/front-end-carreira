export interface IProjeto {
  id: number;
  id_projeto_pai: number;
  local_de_realizacao_previsto: null;
  nivel_projeto: number;
  nome: string;
  meses_previstos: string;
  dias_previstos: string;
  horas_previstas: string;
  minutos_previstos: string;
  custo_previsto: number;
  data_criacao: string;
  data_limite: string;
  descricao: string;
  filhos: [];
}
