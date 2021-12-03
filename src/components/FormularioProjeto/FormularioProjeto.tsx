import React from "react";
import { Button } from "@mui/material";
import FormularioProjetoProvider from './FormularioProjetoContext';


import { Nome, Descricao, TempoPrevisto, CustoPrevisto, SelectDates, DataLimite, DataAgenda } from './Campos';
import BoxFormulario from "./BoxFormulario";



const FormularioProjeto: React.FC = (): React.ReactElement => {

    return (
        <FormularioProjetoProvider>
            <BoxFormulario titulo="Cadastro de projetos">
                <Nome />

                <Descricao />
                <TempoPrevisto />

                <CustoPrevisto />

                <SelectDates />
                <DataLimite />
                <DataAgenda />

                <Button type="submit" sx={{ margin: '20px 20px 5px 5px' }} fullWidth variant="contained" size="medium">Salvar</Button>
            </BoxFormulario>
        </FormularioProjetoProvider>
    );
}



export default FormularioProjeto;