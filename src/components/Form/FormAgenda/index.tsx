import React, { useRef } from 'react';

import { Button, ButtonGroup, Grid } from '@mui/material';

import BoxFormulario from './BoxFormulario';

import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import TextField from '../Inputs/TextField'
import DateTimePicker from '../Inputs/DateTimePicker';

import { useSelector, useDispatch } from 'react-redux';
import { selectFormAgenda, setVisibilidade } from '../../../store/FormAgenda.store';
import { selectAgendas, atualizarAgenda } from '../../../store/Agenda.store';

import { addAgenda } from '../../../store/Agenda.store';

import * as yup from 'yup';
import { IAgenda } from '../../../store/FormAgenda.store';

const validationSchema = () => {
    return yup.object({
        nome: yup.string().required('O nome da agenda é obrigatório'),
        inicio: yup.string().required('Campo obrigatório'),
        fim: yup.string().required('Campo obrigatório')
    })
}

const FormAgenda: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const dispatch = useDispatch();
    const { dados: agendas } = useSelector(selectAgendas);
    const { nomeFormulario, dados: { idAgendaSuperior, id: idAgenda } } = useSelector(selectFormAgenda);
    // const { dados } = useSelector(selectAgendas);


    const salvarNovaAgenda = (dados: IAgenda) => {
        const idFalso = (new Date()).getTime().toString();
        dispatch(addAgenda({ ...dados, idAgendaSuperior, id: idFalso }));
        return idFalso;
    }

    const salvarEdicaoAgenda = (dados: IAgenda) => {
        dispatch(atualizarAgenda({ ...dados, id: idAgenda }));
        dispatch(setVisibilidade(false));
    }

    const salvar = (dados: IAgenda) => {
        if(!idAgenda) {
            return salvarNovaAgenda(dados);
        }
        salvarEdicaoAgenda(dados);
    }

    const handleOnclikLeft = () => {
        dispatch(setVisibilidade(false));
    }

    const handleSubmit: SubmitHandler<IAgenda> = async (data, { reset }) => {
        try {
            const schema = validationSchema();
            await schema.validate(data, { abortEarly: false });
            formRef?.current?.setErrors({});
            salvar(data);
            reset();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let mensagensErros: { [key: string]: any } = {};
                error.inner.forEach(n => mensagensErros[n.path || 'undefined'] = n.message);
                formRef?.current?.setErrors(mensagensErros);
            }
        }
    };


    const getInitialData = () => {
        if (!idAgenda) {
            return {};
        }
        const agendaArray = agendas.filter(n => n.id === idAgenda);
        if (agendaArray.length === 0) {
            return {}
        }
        const agenda = agendaArray[0];

        const inverterDiaMes = (dataHora: string) => {
            if (!dataHora.trim()) return "";
            const [data, hora] = dataHora.split(' ');
            const [dia, mes, ano] = data.split('/');
            return `${mes}/${dia}/${ano} ${hora}`;
        }

        return {
            ...agenda,
            inicio: inverterDiaMes(agenda.inicio),
            fim: inverterDiaMes(agenda.fim)
        };
    };

    return (
        <BoxFormulario titulo={nomeFormulario}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit} initialData={getInitialData()} ref={formRef} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <TextField id="nome" name="nome" label="Nome da Agenda" placeholder="Digite o nome da agenda" maxRows={4} multiline={true} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DateTimePicker label="Inicio Agenda" name="inicio" />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DateTimePicker label="Fim Agenda" name="fim" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ButtonGroup sx={{ m: 1 }} variant="outlined" fullWidth color="inherit" size="large" aria-label="medium secondary button group">
                            <Button onClick={handleOnclikLeft} color="warning" >Cancelar</Button>
                            <Button color="primary" type="submit" >Salvar</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Form>
        </BoxFormulario>
    );
}

export default FormAgenda;