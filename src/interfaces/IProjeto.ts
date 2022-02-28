export interface IProjeto {
  //isto deveria estar no store
  idProjetoSuperior: string;
  id: string;
  nome: string;
  custoPrevisto: string;
  descricao: string;
  dataLimite: string;
  agenda: {
    inicio: string;
    fim: string;
  };
  tempoPrevisto: {
    meses: string;
    dias: string;
    horas: string;
    minutos: string;
  };
  grupo?: string; //para usar no autocomplete no agendamento do projeto
  concluido?: boolean;
}
