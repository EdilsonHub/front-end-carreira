import React from "react";
import { TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import * as yup from 'yup';


interface IValuesFormik {
    nome: string;
    descricao: string;
}


const FormDadosPrincipais: React.FC = () => {
    const formik: FormikProps<IValuesFormik> = useFormik<IValuesFormik>({
        initialValues: {
            nome: '',
            descricao: ''
        },
        validationSchema: yup.object({
            nome: yup.string().required('O nome do projeto está vazio')
        }),
        onSubmit: (values) => {
            console.log(values);
            // submit({ ...values });
            formik.resetForm();
        },
    });

    return (
        <form noValidate autoComplete="off" onSubmit={coisa => console.log(coisa)} >
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
            <TextField
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
            />
        </form>
    );
}

export default FormDadosPrincipais;