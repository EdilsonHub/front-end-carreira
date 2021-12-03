import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { FormikProps } from 'formik';

const Descricao: React.FC = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if (!formik) {
        return (
            <div>O component Descricao não pode ser carregado!</div>
        );
    }

    return (<TextField
        id="formulario-projeto-descricao"
        label="Descrição do projeto"
        multiline
        rows={4}
        fullWidth
        placeholder="Digite a descrição do projeto"
        name="descricao"
        size="small"

        value={formik.values.descricao}
        onChange={formik.handleChange}
        error={formik.touched.descricao && Boolean(formik.errors.descricao)}
        helperText={formik.touched.descricao && formik.errors.descricao}
    />);
}

export default Descricao;
