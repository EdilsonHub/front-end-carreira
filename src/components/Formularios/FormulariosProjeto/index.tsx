import { Button } from "@mui/material";
import React from "react";
import BoxFormulario from "./BoxFormulario";
import FormCustoPrevisto from "./FormCustoPrevisto";
import FormDadosPrincipais from "./FormDadosPrincipais";
import FormDataAgenda from "./FormDataAgenda";
import FormDataLimite from "./FormDataLimite";
import FormTempoPrevisto from "./FormTempoPrevisto";

const FormulariosProjeto: React.FC = ({}) => {
    const submit = () => {

    };

    return (
        <BoxFormulario>
            <FormDadosPrincipais />
            <FormTempoPrevisto />
            <FormCustoPrevisto />
            <FormDataLimite />
            <FormDataAgenda />
            <Button onClick={() => submit()} sx={{ margin: '20px 20px 5px 5px' }} fullWidth variant="contained" size="medium">Salvar</Button>
        </BoxFormulario>
    );
}

export default FormulariosProjeto;