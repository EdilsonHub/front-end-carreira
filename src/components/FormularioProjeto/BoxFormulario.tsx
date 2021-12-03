import { Box, Paper, Typography } from "@mui/material";
import { FormikProps } from "formik";
import React, { useContext } from "react";
import { FormularioProjetoContext, IValuesFormik } from './FormularioProjetoContext';

interface IPropsBoxFormulario {
    titulo?: string;
    // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const BoxFormulario: React.FC<IPropsBoxFormulario> = ({ titulo, children }) => {
    const contextoFormulario = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if(!contextoFormulario) {
        return (
            <div>O BoxFormulario nome não pode ser carregado!</div>
        )
    }

    const { handleSubmit } = contextoFormulario;

    return (<Paper sx={{ padding: '20px 20px 5px 5px' }} elevation={0} >
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
    )
};

export default BoxFormulario;