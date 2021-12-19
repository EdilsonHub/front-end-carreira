import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import TextField from './Inputs/TextField';
import NumberFormat from './Inputs/NumberFormat';
import BoxFormulario from './BoxFormulario';
import { Button, Grid } from '@mui/material';
import * as yup from 'yup';
import DateTimePicker from './Inputs/DateTimePicker';
import { isDate } from 'date-fns';


export interface IDadosFormulario {
    id: string;
    nome: string;
    custoPrevisto: string;
    descricao: string;
    dataLimite: string;
    agenda: {
        inicio: string;
        fim: string;
    }
    tempoPrevisto: {
        meses: string;
        dias: string;
        horas: string;
        minutos: string;
    }
}

const validationSchema = () => {
    return yup.object({
        nome: yup.string().required('O nome do projeto está vazio'),
        // dataLimite: yup.date()
        // .transform((curr, orig, coisa ) => {console.log({curr, orig, coisa}); return curr;})
        // .required('Mandatory field message'),
        tempoPrevisto: yup.object({
            meses: yup.number().transform(n => isNaN(n) ? 0 : n).max(1200, 'Máximo 100 anos').min(0, 'Mínimo 0 minutos'),
            dias: yup.number().transform(n => isNaN(n) ? 0 : n).max(30, 'Máximo 30 dias').min(0, 'Mínimo 0 dias'),
            horas: yup.number().transform(n => isNaN(n) ? 0 : n).max(23, 'Máximo 23 horas').min(0, 'Mínimo 0 horas'),
            minutos: yup.number().transform(n => isNaN(n) ? 0 : n).max(59, 'Máximo 59 minutos').min(0, 'Mínimo 0 minutos')
        })
    })
}

interface IProps {
    onSubmit: (params: IDadosFormulario) => void;
}

const FormProjeto: React.FC<IProps> = ({ onSubmit }) => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<IDadosFormulario> = async (data, { reset }) => {
        try {
            const schema = validationSchema();
            await schema.validate(data, { abortEarly: false });
            formRef?.current?.setErrors({});
            onSubmit(data);
            reset();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // console.log({ error, formRef })
                let mensagensErros: { [key: string]: any } = {};
                error.inner.forEach(n => mensagensErros[n.path || 'undefined'] = n.message);
                formRef?.current?.setErrors(mensagensErros);
            }
        }
    };

    return (
        <BoxFormulario titulo="Cadastro de Projetos">
            <Form noValidate autoComplete="off" onSubmit={handleSubmit} initialData={{ nome: '' }} ref={formRef} >
                <TextField id="id" name="id" label="ID oculto" placeholder="ID oculto da aldeia da folha" maxRows={4} multiline={true} />
                <TextField id="nome" name="nome" label="Nome do projeto" placeholder="Digite o nome do projeto" maxRows={4} multiline={true} />
                <TextField id="descricao" name="descricao" label="Descrição" placeholder="Digite aqui os detalhes do projeto" rows={4} multiline={true} />
                <Scope path='tempoPrevisto'>
                    <Grid container spacing="15">
                        {[
                            { id: 'meses', name: 'meses', label: 'Meses', max: '1200' },
                            { id: 'dias', name: 'dias', label: 'Dias', max: '30' },
                            { id: 'horas', name: 'horas', label: 'Horas', max: '23' },
                            { id: 'minutos', name: 'minutos', label: 'Minutos', max: '59' }
                        ].map(({ id, name, label, max: valorMaximo }) => (
                            <Grid item xs={3} key={id}>
                                <TextField id={id} name={name} label={label} type="number" maxRows={1} InputProps={{ inputProps: { min: "0", step: "1", max: valorMaximo } }} />
                            </Grid>)
                        )}
                    </Grid>
                </Scope>
                <NumberFormat id="custoPrevisto" name="custoPrevisto" label="Custo Previsto (R$)" placeholder="Digite o custo previsto" />
                <DateTimePicker label="Data limite" name="dataLimite" />

                <Scope path='agenda'>
                    <Grid container spacing="15">
                        <Grid item xs={6} >
                            <DateTimePicker label="Inicio Agenda" name="inicio" />
                        </Grid>
                        <Grid item xs={6} >
                            <DateTimePicker label="Fim Agenda" name="fim" />
                        </Grid>
                    </Grid>
                </Scope>

                <Button sx={{ margin: 1 }} type="submit" fullWidth variant="contained" size="medium">Salvar</Button>
            </Form>
        </BoxFormulario>
    );
};

export default FormProjeto;


