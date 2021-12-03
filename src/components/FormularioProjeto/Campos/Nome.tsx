import React, { ChangeEventHandler, Context, ProviderProps, useContext } from 'react';
import { TextField } from '@mui/material';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { FormikProps } from 'formik';

const Nome = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if (!formik) {
        return (
            <div>O component Nome não pode ser carregado!</div>
        )
    }

    return (
        <TextField
            id="formulario-projeto-nome"
            label="Nome do Projeto"
            multiline
            maxRows={4}
            fullWidth
            placeholder="Digite o nome do projeto"
            name="nome"
            size="small"

            value={formik.values.nome}
            onChange={formik.handleChange}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
        />
    );
}

export default Nome;


