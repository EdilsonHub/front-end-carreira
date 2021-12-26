import React, { useState, useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Detalhes from './DetalhesProjeto';
import { IDadosFormulario } from '../Form/FormProjeto';
import ListaProjeto from './index';
import { montarStringAgenda, montarStringTempoPrevito } from './helper';
import MenuProjeto from './MenuProjeto';

import { useSelector } from 'react-redux';
import { selectData } from '../../store/FormProjeto.store';

const Projeto: React.FC<IDadosFormulario> = ({ id, idProjetoSuperior, nome, descricao, dataLimite, tempoPrevisto, custoPrevisto, agenda }) => {

    // const dispatch = useDispatch();

    const [detalhado, setDetalhado] = useState<boolean>(false);
    const [listaProjetosFilhos, setListaProjetosFilhos] = useState<IDadosFormulario[]>([]);

    const controlsForm = useSelector(selectData);

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
                // console.log('OLA EU SOU useMemo');
                setListaProjetosFilhos(controlsForm.projetos.filter(n => n.idProjetoSuperior === id));
            }
        },
        [controlsForm.projetos, detalhado, id]
    );

    const handleChangeAcordion = () => {

            const valueDetalhado = detalhado;
            if (!valueDetalhado) {
                setDetalhado(true);
                setListaProjetosFilhos(controlsForm.projetos.filter(n => n.idProjetoSuperior === id));
            } else {
                setDetalhado(false);
            }
        };

    // console.log({ id });

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }} disableGutters expanded={detalhado} key={id} onChange={handleChangeAcordion}>

            <AccordionSummary
                // sx={{backgroundColor: '#ccc', color: '#FFF'}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id={"panel2bh-header-" + id}
            >
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography /*sx={cssTitulo}*/  >{nome}</Typography>
                    </Grid>
                    <Grid item>
                        {!!dataLimite && <Typography sx={{ color: 'text.secondary', /*textAlign: 'end',*/ alignSelf: 'center' }}>{dataLimite}</Typography>}
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

