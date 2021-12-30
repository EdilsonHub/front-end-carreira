import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import { TextField, Box, Grid, Button, Breadcrumbs, Typography, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch } from 'react-redux';
import { selectAgendas, IAgenda } from '../../store/Agenda.store';
import { selectAgendamentos, IAgendamento } from '../../store/Agendamento.store';
import { selectProjetos, IProjeto } from '../../store/Projetos.store';

import { setVisibilidade, setIdAgenda as setIdFormAgenda, setIdAgendaSuperior } from '../../store/FormAgenda.store';


import BuscaProjeto from './BuscaProjeto';

import CustomPaginationActionsTable from '../../components/TablePaginationActions';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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

    const handleOnclickAgendarProjeto = () => {
        // setListaBuscadores([...listaBuscadores, <BuscaProjeto/ >]);
    };

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
        setAgendamentoAtual(agendamentos.filter(n => n.idAgenda = idAgenda));
    }, [agendamentos, idAgenda]);

    const mudarAgenda = (idAgenda: string) => {
        setIdAgenda(idAgenda)
    }

    const abrirFormularioAgenda = () => {
        dispatch(setVisibilidade(true));
        dispatch(setIdFormAgenda(''));
        dispatch(setIdAgendaSuperior(idAgenda));
    }


    return (
        <>
            {/* idAgenda: -{idAgenda}- */}
            <Breadcrumbs aria-label="breadcrumb" component="h5" >
                <Button key="id_solo" onClick={() => mudarAgenda('')} >
                    <Typography variant="h5" component="h5">Home</Typography>
                </Button>
                {historicoAgendas.map(({ id, nome, inicio, fim }: IAgenda, index: number) => (
                    <Button key={id} onClick={() => mudarAgenda(id)} disabled={historicoAgendas.length === (index + 1)}>
                        <Typography variant="h5" component="h5">{nome}</Typography>
                    </Button>
                ))
                }
            </Breadcrumbs>

            <Box component="div" sx={{ paddingBottom: 2 }}>
                <Grid container spacing={2}>
                    {agendasDisponiveis.map(({ id, nome, inicio, fim }: IAgenda) => (
                        <Grid item key={id}>
                            <Button onClick={() => mudarAgenda(id)}  variant="outlined" >{nome}</Button>
                        </Grid>))
                    }
                    <Grid item key="id_solo">
                        <Button onClick={abrirFormularioAgenda} variant="outlined" startIcon={<AddIcon color="primary" />}>Adicionar agenda</Button>
                    </Grid>
                </Grid>
            </Box>

            {(agendamentoAtual.length > 0) && <CustomPaginationActionsTable rows={agendamentoAtual} />}

            <Box component="div" sx={{ paddingTop: 2, paddingBottom: 2, textAlign: 'right' }}>
                <Button variant="outlined" onClick={handleOnclickAgendarProjeto} startIcon={<AddIcon color="primary" />} >Abrir busca de projeto para agendamento</Button>
            </Box>
            <BuscaProjeto />
        </>
    );
}

export default Agenda;