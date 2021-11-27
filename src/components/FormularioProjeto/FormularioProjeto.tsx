import React, { FormEventHandler, useState } from "react";
import { Box, Button, Collapse, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";


import { Nome, Descricao, TempoPrevisto, CustoPrevisto, SelectDates } from './Campos';


interface IProps {
    submit: Function
};

interface IPropsBoxFormulario {
    titulo?: string;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
};



const BoxFormulario: React.FC<IPropsBoxFormulario> = ({ titulo, children, handleSubmit }) => (
    <Paper sx={{ padding: '20px 20px 5px 5px' }} elevation={0} >
        <Typography variant="h4" component="h4" paddingLeft={1} >{titulo}</Typography>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 }
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            {children}
        </Box>
    </Paper>
);

const validationSchema = () => {
    return yup.object({
        nome: yup.string().required('O nome do projeto está vazio'),
        meses: yup.number().max(1200, 'Máximo 100 anos').min(0, 'Mínimo 0 minutos'),
        dias: yup.number().max(30, 'Máximo 30 dias').min(0, 'Mínimo 0 dias'),
        horas: yup.number().max(30, 'Máximo 23 horas').min(0, 'Mínimo 0 horas'),
        minutos: yup.number().max(30, 'Máximo 59 minutos').min(0, 'Mínimo 0 minutos')
    });
}

const getInitialValores = () => {
    return {
        nome: '',
        custo: '',
        descricao: '',
        dias: '',
        meses: '',
        horas: '',
        minutos: ''
    }
}


const FormularioProjeto: React.FC<IProps> = ({ submit }): React.ReactElement => {
    const formik = useFormik({
        initialValues: getInitialValores(),
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            submit({ ...values });
            console.log(AdapterDateFns);
            formik.resetForm();
        },
    });

    const camposTempoPrevisto = [
        {
            id: "formulario-projeto-tempo-meses",
            name: "meses",
            label: "Meses",
            max: "1200",
            value: formik.values.meses,
            onChange: formik.handleChange,
            error: formik.touched.meses && Boolean(formik.errors.meses),
            helperText: formik.touched.meses && formik.errors.meses,
        },
        {
            id: "formulario-projeto-tempo-dias",
            name: "dias",
            label: "Dias",
            max: "30",
            value: formik.values.dias,
            onChange: formik.handleChange,
            error: formik.touched.dias && Boolean(formik.errors.dias),
            helperText: formik.touched.dias && formik.errors.dias,
        },
        {
            id: "formulario-projeto-tempo-horas",
            name: "horas",
            label: "Horas",
            max: "23",
            value: formik.values.horas,
            onChange: formik.handleChange,
            error: formik.touched.horas && Boolean(formik.errors.horas),
            helperText: formik.touched.horas && formik.errors.horas,
        },
        {
            id: "formulario-projeto-tempo-minutos",
            name: "minutos",
            label: "Minutos",
            max: "59",
            value: formik.values.minutos,
            onChange: formik.handleChange,
            error: formik.touched.minutos && Boolean(formik.errors.minutos),
            helperText: formik.touched.minutos && formik.errors.minutos,
        }
    ];

    const [ativarDataLimite, setAtivarDataLimite] = useState<boolean>(false);
    const [cadastrarAgenda, setCadastrarAgenda] = useState<boolean>(false);

    const [dataLimite, setDataLimite] = useState<Date | null>(new Date());
    const [dataInicioAgenda, setDataInicioAgenda] = useState<Date | null>(new Date());
    const [dataFimAgenda, setDataFimAgenda] = useState<Date | null>(new Date());



    return (
        <BoxFormulario titulo="Cadastro de projetos" handleSubmit={formik.handleSubmit} >
            <Nome
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
            />
            <Descricao
                value={formik.values.descricao}
                onChange={formik.handleChange}
                error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                helperText={formik.touched.descricao && formik.errors.descricao}
            />
            <TempoPrevisto campos={camposTempoPrevisto} />
            <CustoPrevisto
                value={formik.values.custo}
                onChange={formik.handleChange}
                error={formik.touched.custo && Boolean(formik.errors.custo)}
                helperText={formik.touched.custo && formik.errors.custo}
            />
            <SelectDates>
                <Grid container xs>
                    <Grid xs={6} alignContent="baseline">
                        <FormControlLabel control={
                            <Switch name="ativarDataLimite" checked={ativarDataLimite} onChange={(event) => setAtivarDataLimite(event.target.checked)} />
                        } label="Ativar data Limite" />
                    </Grid>
                    <Grid xs={6}>
                        <FormControlLabel control={
                            <Switch name="cadastrarAgenda" checked={cadastrarAgenda} onChange={(event) => setCadastrarAgenda(event.target.checked)} />
                        } label="Cadastrar agenda" />
                    </Grid>
                </Grid>
            </SelectDates>

            <Collapse in={ativarDataLimite} >
                <MobileDateTimePicker
                    disabled={false}
                    label="Data limite"
                    value={dataLimite}
                    onChange={(data) => {
                        setDataLimite(data);
                    }}
                    renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
                />

            </Collapse>

            <Collapse in={cadastrarAgenda} >
                <Grid container xs>
                    <Grid xs={6} alignContent="baseline" item>
                        <MobileDateTimePicker
                            disabled={false}
                            label="Inicio agenda"
                            value={dataInicioAgenda}


                            onChange={(data) => {
                                setDataInicioAgenda(data);
                            }}
                            renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}

                        />

                    </Grid>
                    <Grid xs={6} alignContent="baseline" item>
                        <MobileDateTimePicker
                            disabled={false}
                            label="Fim Agenda"
                            value={dataFimAgenda}
                            onChange={(data) => {
                                setDataFimAgenda(data);
                            }}
                            renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
                        />

                    </Grid>
                </Grid>
            </Collapse>

            <Button type="submit" sx={{ margin: '20px 20px 5px 5px' }} fullWidth variant="contained" size="medium">Salvar</Button>
        </BoxFormulario>
    );
}



export default FormularioProjeto;