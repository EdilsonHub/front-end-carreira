import React, { useState, useMemo, memo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Detalhes from './DetalhesProjeto';
import { IDadosFormulario } from '../Form/FormProjeto';
import ListaProjeto from './index';
import { montarStringAgenda, montarStringTempoPrevito } from './helper';
import MenuProjeto from './MenuProjeto';

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';


interface IProps {
    dadosFormulario: IDadosFormulario
    idProjetoAberto: string | null;
    setIdProjetoAberto: Function;
}

const Projeto: React.FC<IProps> = ({ dadosFormulario, idProjetoAberto, setIdProjetoAberto }) => {
    const { id, nome, descricao, dataLimite, tempoPrevisto, custoPrevisto, agenda } = dadosFormulario;

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

    const handleOnchange = () => {
        setIdProjetoAberto((prev: string) => (prev === id) ? null : id);
    }
    useMemo(
        () => {
            if (id === idProjetoAberto) {
                setListaProjetosFilhos(dados.filter(n => (n.idProjetoSuperior && n.idProjetoSuperior === id)));
            }
        },
        [idProjetoAberto, dados, id]
    );

    // const teste = () => {
    //     let pais: any[] = [];
    //     let semFilhos: any[] = [];
    //     let root: any[] = [];

    //     // for (let i = 0; i < dados.length; i++) {
    //     //     indices.push([]);
    //     //  }


    //     // if (isNaN(Number(project.idProjetoSuperior))) {
    //     //     throw new Error("erro: " + project.idProjetoSuperior);
    //     // }

    //     dados.forEach((project: IDadosFormulario) => {
    //         if (project.idProjetoSuperior) {



    //             if (!pais[Number(project.idProjetoSuperior)]) {
    //                 pais[Number(project.idProjetoSuperior)] = [];
    //             }
    //             pais[Number(project.idProjetoSuperior)].push(project.id);
    //         } else {
    //             semFilhos.push(project.id)
    //         }
    //     })

    //     dados.forEach((project: IDadosFormulario) => {
    //         if (project.idProjetoSuperior) {

    //             let arrContent = root.filter(n => n.id === project.idProjetoSuperior);
                
    //             if (arrContent.length > 0) {
    //                 arrContent[0].idsFilhos.push(project.id)
    //             } else {
    //                 root.push({ id: project.idProjetoSuperior, idsFilhos: [project.id] })
    //             }

    //         } else {
    //             root.push({ id: project.id, idsFilhos: [] })
    //         }
    //     })

    //     console.log(root);
    //     console.log([...pais, ...semFilhos]);
    // }

    return (
        <>

            <Accordion TransitionProps={{ unmountOnExit: true }} disableGutters expanded={(id === idProjetoAberto)} key={id} onChange={handleOnchange}>

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
                            {!!dataLimite && <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>{dataLimite}</Typography>}
                        </Grid>
                    </Grid>
                </AccordionSummary>

                <Divider />

                <AccordionDetails sx={{ backgroundColor: 'rgb(240 237 248)', color: '#FFF' }}>

                    <Grid container justifyContent="space-between">
                        <Grid item>{!!descricao && <Detalhes value={descricao} label="Descrição: " />}</Grid>
                        <Grid item style={{ margin: 'auto 0 auto auto' }}>
                            <MenuProjeto tooltips={tooltipsLabel} idProjeto={id} nomeProjeto={nome} />
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
        </>
    );
}

export default memo(Projeto);

