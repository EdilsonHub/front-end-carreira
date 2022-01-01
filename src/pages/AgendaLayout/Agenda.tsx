import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Breadcrumbs, Typography, ButtonGroup } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector, useDispatch } from 'react-redux';
import { selectAgendas, IAgenda, removerAgenda } from '../../store/Agenda.store';
import { selectAgendamentos, IAgendamento } from '../../store/Agendamento.store';
import { selectProjetos, IProjeto } from '../../store/Projetos.store';

import { setVisibilidade, setIdAgenda as setIdFormAgenda, setIdAgendaSuperior } from '../../store/FormAgenda.store';


import BuscaProjetoAgendamento from './BuscaProjetoAgendamento';

import CustomPaginationActionsTable from '../../components/TablePaginationActions';

interface IProps {
    idAgenda: string;
    setIdAgenda: Function;
}


const getHistoricoAgendas = (dados: IAgenda[], agendaAtual: IAgenda | undefined) => {
    let arrayData: IAgenda[] = [];

    const procurar = (idSuperior: string) => {
        let result = dados.filter(n => n.id === idSuperior);
        if (result.length === 1) {
            arrayData.push(result[0]);
            if (result[0].idAgendaSuperior) {
                procurar(result[0].idAgendaSuperior);
            }
        }
    }
    if (!agendaAtual) {
        return [];
    }

    arrayData.push(agendaAtual);
    procurar(agendaAtual.idAgendaSuperior)
    return arrayData.reverse();
}


const Agenda: React.FC<IProps> = ({ idAgenda, setIdAgenda }) => {

    const { dados: agendas } = useSelector(selectAgendas);
    const { dados: agendamentos } = useSelector(selectAgendamentos);
    const { dados: projetos } = useSelector(selectProjetos);

    const dispatch = useDispatch()

    // const handleOnclickAgendarProjeto = () => {
    //     // setListaBuscadores([...listaBuscadores, <BuscaProjeto/ >]);
    // };

    const [agendaAtual, setAgendaAtual] = useState<IAgenda>();
    const [agendamentoAtual, setAgendamentoAtual] = useState<IAgendamento[]>([]);
    const [historicoAgendas, setHistoricoAgendas] = useState<IAgenda[]>([]);
    const [agendasDisponiveis, setAgendasDisponiveis] = useState<IAgenda[]>([]);
    const [projetosEscolhiveis, setProjetosEscolhiveis] = useState<IProjeto[]>([]);


    useEffect(() => {
        setAgendasDisponiveis(agendas.filter(n => n.idAgendaSuperior === idAgenda));
        const agendaAtualArray = agendas.filter(n => n.id === idAgenda);
        const agendaAT = (agendaAtualArray.length > 0) ? agendaAtualArray[0] : undefined;
        setAgendaAtual(agendaAT);
        setHistoricoAgendas(getHistoricoAgendas(agendas, agendaAT));

    }, [agendas, idAgenda]);

    useEffect(() => {
        setAgendamentoAtual(agendamentos.filter(n => n.idAgenda === idAgenda));
    }, [agendamentos, idAgenda]);


    useEffect(() => {
        const agrupar = (p: IProjeto[], grupo: string) => p.map(n => ({ ...n, grupo }));
        const projetosRoot = projetos.filter(p => (
            !p.idProjetoSuperior
            && agendamentos.filter(ag => ag.idProjeto === p.id).length === 0
        ));
        let projetosAgendamentosAgendaMae: IProjeto[] = [];
        let agendalentosAgendaMae: IAgendamento[] = [];
        if (agendaAtual?.idAgendaSuperior) {
            agendalentosAgendaMae = agendamentos.filter(n => (n.idAgenda === agendaAtual.idAgendaSuperior));
            projetosAgendamentosAgendaMae = projetos.filter(n => agendalentosAgendaMae.map(n => n.idProjeto).includes(n.id))
        }

        const getNomeAgendaAnterior = () => {
            if (historicoAgendas.length < 2) return "NÃO POSSUÍ AGENDA SUPERIOR";
            const indicePenultimo = historicoAgendas.length - 2;
            return historicoAgendas[indicePenultimo].nome.toUpperCase();
        }
        setProjetosEscolhiveis([
            ...agrupar(projetosAgendamentosAgendaMae, getNomeAgendaAnterior()),
            ...agrupar(projetosRoot, "NÃO AGENDADOS")
        ]);
    }, [idAgenda, agendaAtual?.idAgendaSuperior, agendamentos, projetos, historicoAgendas]);

    const mudarAgenda = (idAgenda: string) => {
        setIdAgenda(idAgenda)
    }

    const abrirFormularioAgenda = () => {
        dispatch(setVisibilidade(true));
        dispatch(setIdFormAgenda(''));
        dispatch(setIdAgendaSuperior(idAgenda));
    }

    const abrirEdicaoAgenda = () => {
        dispatch(setVisibilidade(true));
        dispatch(setIdFormAgenda(idAgenda));
        dispatch(setIdAgendaSuperior(""));

    }

    const handleClickRemoverAgenda = () => {
        if (agendaAtual) {
            dispatch(removerAgenda(agendaAtual.id));
            setIdAgenda(agendaAtual.idAgendaSuperior);
        }
    };

    // const getHeaderTabela = () => {
    //     if(!agendaAtual) return "Nenhuma agenda selecionada";
    //     return `${agendaAtual.inicio || 'DATA NÃO ATRIBUÍDA'} à ${agendaAtual.fim || 'DATA NÃO ATRIBUÍDA'} `;
    // }


    return (
        <>
            {/* idAgenda: -{idAgenda}- */}
            <Breadcrumbs aria-label="breadcrumb" component="h5" >
                <Button key="id_solo" onClick={() => mudarAgenda('')} >
                    <Typography variant="h5" component="h5">Home</Typography>
                </Button>
                {historicoAgendas.map(({ id, nome, inicio, fim }: IAgenda, index: number) => (
                    <Button key={id} onClick={() => mudarAgenda(id)} disabled={historicoAgendas.length === (index + 1)}>
                        <Typography variant="h5" component="h5">{(historicoAgendas.length === (index + 1)) ? `${nome} (${inicio} à ${fim})` : nome}</Typography>
                    </Button>
                ))
                }
            </Breadcrumbs>

            <Box component="div" sx={{ paddingBottom: 2 }} >
                <Grid container spacing={2}>
                    {agendasDisponiveis.map(({ id, nome, inicio, fim }: IAgenda) => (
                        <Grid item key={id}>
                            <Button onClick={() => mudarAgenda(id)} variant="outlined" >{nome}</Button>
                        </Grid>))
                    }
                    <Grid item key="id_solo" marginRight="0" sx={{ margin: 'auto 0 auto auto' }}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={abrirFormularioAgenda} variant="outlined" startIcon={<AddIcon color="primary" />}>Adicionar agenda</Button>
                            {agendaAtual && <Button onClick={abrirEdicaoAgenda} startIcon={<EditIcon />}>Editar Agenda</Button>}
                            {(agendaAtual && agendamentoAtual.length < 1 && agendasDisponiveis.length === 0) && <Button onClick={handleClickRemoverAgenda} color="warning" startIcon={<DeleteForeverIcon />}>Remover Agenda</Button>}
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Box>

            {(historicoAgendas.length > 0) && <CustomPaginationActionsTable rows={agendamentoAtual} />}
            {/* 
            {(historicoAgendas.length > 0) && (
                <Box component="div" sx={{ paddingTop: 2, paddingBottom: 2, textAlign: 'right' }}>
                    <Button variant="outlined" onClick={handleOnclickAgendarProjeto} startIcon={<AddIcon color="primary" />} >Abrir busca de projeto para agendamento</Button>
                </Box>
            )} 
            */}

            {
                (historicoAgendas.length > 0 && projetosEscolhiveis.length > 0) && <BuscaProjetoAgendamento
                    projetosEscolhiveis={projetosEscolhiveis}
                    idAgenda={idAgenda}
                    idAgendaSuperior={agendaAtual?.idAgendaSuperior || ""}
                />
            }


        </>
    );
}

export default Agenda;