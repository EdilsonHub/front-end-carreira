import React, { useEffect, useRef, useState } from 'react';
import { IProjeto, selectProjetos } from '../../store/Projetos.store';
import { addAgendamentos } from '../../store/Agendamento.store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Autocomplete, TextField, Breadcrumbs, Typography, Box, Grid } from '@mui/material';


import { Form } from '@unform/web';
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import DateTimePicker from '../../components/Form/Inputs/DateTimePicker';


interface IProps {
    projetosEscolhiveis: IProjeto[];
    idAgenda: string;
}

interface IFormAgendamento {
    inicio: string;
    fim: string;
}

const BuscaProjetoAgendamento: React.FC<IProps> = ({ projetosEscolhiveis: projetosEscolhiveisParams, idAgenda }) => {

    const formRef = useRef<FormHandles>(null);

    const dispatch = useDispatch();
    const { dados: projetos } = useSelector(selectProjetos);

    const [projetosEscolhiveis, setProjetosEscolhiveis] = useState<IProjeto[]>(projetosEscolhiveisParams);
    const [projetoEscolhido, setProjetoEscolhido] = useState<IProjeto | null>(null);
    const [projetoAtual, setProjetoAtual] = useState<IProjeto | null>(null);
    const [projetoPath, setProjetoPath] = useState<IProjeto[]>([]);

    useEffect(
        () => {
            if (projetoEscolhido) {
                setProjetoPath(state => ([...state, projetoEscolhido]));
                setProjetosEscolhiveis(projetos.filter(n => n.idProjetoSuperior === projetoEscolhido.id));
                setProjetoAtual(projetoEscolhido);
                setProjetoEscolhido(null);
            }
        },
        [projetoEscolhido]
    );

    const escolherProjetoDoPath = (projeto: IProjeto | null | undefined) => {
        if (projeto) {
            setProjetoPath(projetoPath.slice(0, projetoPath.indexOf(projeto)));
            setProjetoEscolhido(projeto);
        } else {
            setProjetoPath([]);
            setProjetoEscolhido(null);
            setProjetosEscolhiveis(projetosEscolhiveisParams);
            setProjetoAtual(null);

        }
    }

    const getCaminhoHistoricoProjeto = () => {
        const nomes = projetoPath.map(n => n.nome);
        nomes.pop();
        return (projetoPath.length > 1)? (nomes.join(" / ") + " / ") : "";
    }

    const agendarProjeto = (date: IFormAgendamento) => {
        if (projetoAtual && date.inicio && date.fim) {
            dispatch(addAgendamentos({
                id: (new Date()).getTime().toString(),
                idAgenda,
                idProjeto: projetoAtual.id,
                caminhoProjeto: getCaminhoHistoricoProjeto(),
                nomeProjeto: projetoAtual.nome,
                inicio: date.inicio,
                fim: date.fim
            }))
        }
    }


    const handleSubmit: SubmitHandler<IFormAgendamento> = async (date, { reset }) => {
        try {
            agendarProjeto(date);
            reset();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" component="h5" >
                    <Button key="todos_projetos_id" onClick={() => { escolherProjetoDoPath(null) }} disabled={projetoPath.length === 0} sx={{ p: 0 }}>
                        <Typography >Todos os projetos disponíveis</Typography>
                    </Button>
                    {projetoPath.map((projeto: IProjeto, index: number) => (
                        <Button key={projeto.id} onClick={() => { escolherProjetoDoPath(projeto) }} disabled={projetoPath.length === (index + 1)} sx={{ p: 0 }}>
                            <Typography >{projeto.nome}</Typography>
                        </Button>
                    ))
                    }
                </Breadcrumbs>
            </Box>

            <Form noValidate autoComplete="off" onSubmit={handleSubmit} initialData={{}} ref={formRef} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} xl={6}>
                    <Autocomplete
                        style={{ width: '100%' }}
                        // fullWidth
                        disablePortal
                        disabled={(projetosEscolhiveis.length === 0)}
                        id="combo-box-demo"
                        options={projetosEscolhiveis}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.nome}
                        renderInput={(params) => <TextField {...params} label={projetoAtual?.nome || 'Projetos disponíveis'} size="small" placeholder='Escolha um projeto' fullWidth />}
                        value={projetoEscolhido}
                        onChange={(event: any, newValue: IProjeto | null) => {
                            setProjetoEscolhido(newValue);
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DateTimePicker label="Data inicial" name="inicio" />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DateTimePicker label="Data Final" name="fim" />
                    </Grid>
                    <Grid item xs={12} md={3} xl={2}>
                        <Button variant="outlined" fullWidth size='large' color="primary" type="submit" >Agendar projeto</Button>
                    </Grid>
                </Grid>
            </Form>
        </>
    );

}

export default BuscaProjetoAgendamento;