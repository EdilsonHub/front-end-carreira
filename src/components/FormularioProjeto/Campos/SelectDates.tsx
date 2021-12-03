import React, { FormEventHandler, useContext, useState } from "react";
import { styled, Paper, Grid, FormControlLabel, Switch } from '@mui/material';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { FormikProps } from 'formik';


const SelectDatesPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const SelectDates = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if (!formik) {
        return (
            <div>O component SelectDates não pode ser carregado!</div>
        )
    }

    return (
        <SelectDatesPaper>
            <Grid container xs>
                <Grid xs={6} alignContent="baseline">
                    <FormControlLabel control={
                        <Switch name="ativarDataLimite" checked={formik.values.ativarDataLimite} onChange={formik.handleChange} />
                    } label="Ativar data Limite" />
                </Grid>
                <Grid xs={6}>
                    <FormControlLabel control={
                        <Switch name="cadastrarAgenda" checked={formik.values.cadastrarAgenda} onChange={formik.handleChange} />
                    } label="Cadastrar agenda" />
                </Grid>
            </Grid>
        </SelectDatesPaper>
    );
}


export default SelectDates;