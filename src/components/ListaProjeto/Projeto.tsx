import React, { useState, useMemo, memo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Detalhes from "./DetalhesProjeto";
import { IProjeto } from "../../interfaces/IProjeto";
import ListaProjeto from "./index";
import { montarStringAgenda, montarStringTempoPrevito } from "./helper";
import MenuProjeto from "./MenuProjeto";
import { useProjeto } from "../../hooks/useProjeto";

interface IProps {
  dadosFormulario: IProjeto;
  idProjetoAberto: string | null;
  setIdProjetoAberto: Function;
}

const Projeto: React.FC<IProps> = ({
  dadosFormulario,
  idProjetoAberto,
  setIdProjetoAberto,
}) => {
  const {
    id,
    nome,
    descricao,
    dataLimite,
    tempoPrevisto,
    custoPrevisto,
    agenda,
    concluido,
  } = dadosFormulario;

  const [listaProjetosFilhos, setListaProjetosFilhos] = useState<IProjeto[]>(
    []
  );

  // const { dados } = useSelector(selectProjetos);

  const { dados, searchProjetosBancoDados } = useProjeto();

  const tempoPrevistoString = montarStringTempoPrevito(tempoPrevisto);
  const agendaString = montarStringAgenda(agenda);
  const labelBtnAgenda = agendaString ? "Editar Agenda" : "Agendar";
  const tooltipsLabel = {
    adicionar: "Adicionar subprojeto",
    editar: "Editar",
    deletar: "Deletar",
    agendar: labelBtnAgenda,
  };

  const handleColorDetalhes = () => {
    return concluido ? "darkGrey" : "grey";
  };

  const handleOnchange = () => {
    setIdProjetoAberto((prev: string) => {
      if (prev === id) {
        return null;
      }

      const listaProjetosFilhos = dados.filter(
        (n) => n.idProjetoSuperior && n.idProjetoSuperior === id
      );

      setListaProjetosFilhos(listaProjetosFilhos);
      searchProjetosBancoDados(listaProjetosFilhos.map((n) => n.id));

      return id;
    });
  };

  return (
    <>
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        disableGutters
        expanded={id === idProjetoAberto}
        key={id}
        onChange={handleOnchange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id={"panel2bh-header-" + id}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography color={concluido ? "darkgrey" : "primary"}>
                {nome}
              </Typography>
            </Grid>
            <Grid item>
              {!!dataLimite && (
                <Typography
                  sx={{ color: "text.secondary", alignSelf: "center" }}
                >
                  {dataLimite}
                </Typography>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>

        <Divider />

        <AccordionDetails sx={{ backgroundColor: "rgb(240 237 248)" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              {!!descricao && (
                <Detalhes
                  color={handleColorDetalhes()}
                  value={descricao}
                  label="Descrição: "
                />
              )}
            </Grid>
            <Grid item style={{ margin: "auto 0 auto auto" }}>
              <MenuProjeto
                tooltips={tooltipsLabel}
                idProjeto={id}
                nomeProjeto={nome}
                projetoConcluido={!!concluido}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between">
            {!!custoPrevisto && (
              <Grid item>
                <Detalhes
                  color={handleColorDetalhes()}
                  value={custoPrevisto}
                  label="Custos Previsto: "
                />{" "}
              </Grid>
            )}
            {!!tempoPrevistoString && (
              <Grid item>
                <Detalhes
                  color={handleColorDetalhes()}
                  value={tempoPrevistoString}
                  label="Tempo Previsto: "
                />{" "}
              </Grid>
            )}
            {!!agendaString && (
              <Grid item>
                <Detalhes
                  color={handleColorDetalhes()}
                  value={agendaString}
                  label="Agendado: "
                />{" "}
              </Grid>
            )}
          </Grid>

          <Box component="div" sx={{ boxShadow: "0 0 10px #ccc" }}>
            <ListaProjeto
              dados={listaProjetosFilhos}
              idProjetoSuperior={id}
              labelBtnAddProjeto={`Adicionar subprojeto ao projeto ${nome}`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(Projeto);
