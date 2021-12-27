import React, { useState, useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Detalhes from './DetalhesProjeto';
import { IDadosFormulario } from '../Form/FormProjeto';
import ListaProjeto from './index';
import { montarStringAgenda, montarStringTempoPrevito } from './helper';
import MenuProjeto from './MenuProjeto';

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';

const Projeto: React.FC<IDadosFormulario> = ({ id, idProjetoSuperior, nome, descricao, dataLimite, tempoPrevisto, custoPrevisto, agenda }) => {

    const [detalhado, setDetalhado] = useState<boolean>(false);
    const [listaProjetosFilhos, setListaProjetosFilhos] = useState<IDadosFormulario[]>([]);

    const { dados } = useSelector(selectProjetos);

    const tempoPrevistoString = montarStringTempoPrevito(tempoPrevisto);
    const agendaString = montarStringAgenda(agenda);
    const labelBtnAgenda = agendaString ? 'Editar Agenda' : 'Agendar'
    const tooltipsLabel = {
        adicionar: "Adicionar subprojeto",
        editar: "Editar",
        deletar: "Deletar",
        agendar: labelBtnAgenda 
    }

    useMemo(
        () => {
            if (detalhado) {
                setListaProjetosFilhos(dados.filter(n => n.idProjetoSuperior === id));
            }
        },
        [dados, detalhado, id]
    );

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }} disableGutters expanded={detalhado} key={id} onChange={() => setDetalhado(prev => !prev)}>

            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id={"panel2bh-header-" + id}
            >
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography >{nome}</Typography>
                    </Grid>
                    <Grid item>
                        {!!dataLimite && <Typography sx={{ color: 'text.secondary',  alignSelf: 'center' }}>{dataLimite}</Typography>}
                    </Grid>
                </Grid>
            </AccordionSummary>

            <Divider />

            <AccordionDetails sx={{backgroundColor: 'rgb(240 237 248)', color: '#FFF'}}>
                
                <Grid container justifyContent="space-between">
                    <Grid item>{!!descricao && <Detalhes value={descricao} label="Descrição: " />}</Grid>
                    <Grid item style={{ margin: 'auto 0 auto auto' }}>
                        <MenuProjeto tooltips={tooltipsLabel} idProjeto={id} />
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-between">

                    {!!custoPrevisto && <Grid item ><Detalhes value={custoPrevisto} label="Custos Previsto: " />  </Grid>}
                    {!!tempoPrevistoString && <Grid item ><Detalhes value={tempoPrevistoString} label="Tempo Previsto: " />  </Grid>}
                    {!!agendaString && <Grid item ><Detalhes value={agendaString} label="Agendado: " />  </Grid>}

                </Grid>

                <Box component="div" sx={{ boxShadow: '0 0 10px #ccc' }} >
                    <ListaProjeto dados={listaProjetosFilhos} idProjetoSuperior={id} labelBtnAddProjeto={`Adicionar subprojeto ao projeto ${nome}`} />
                </Box>

            </AccordionDetails >
        </Accordion >
    );
}

export default Projeto;

