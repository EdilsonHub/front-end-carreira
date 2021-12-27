import React, { useEffect, useState } from "react";

import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";
import ListaProjeto from "../ListaProjeto";

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';
import { Button, Box } from "@mui/material";

import { useDispatch } from 'react-redux';
import { setIdProjetoSuperior, setVisibilidade, setIdProjeto, setNomeFormulario } from '../../store/FormProjeto.store';

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<IDadosFormulario[]>([]);

    const { dados } = useSelector(selectProjetos);
    const dispatch = useDispatch();

    const handleOnclickAddProjeto = () => {
        dispatch(setIdProjeto(''));
        dispatch(setIdProjetoSuperior(''));
        dispatch(setNomeFormulario(`Cadastrar Novo Projeto`));
        dispatch(setVisibilidade(true));
    };

    useEffect(
        () => {
            setArrayData(dados.filter(n => !n.idProjetoSuperior));
        },
        [dados]
    );


    return (
        <div>
            <Box component="div" sx={{ p: 2, textAlign: 'right' }}>
                <Button onClick={handleOnclickAddProjeto} >
                    Adicionar Novo Projeto
                </Button>
            </Box>
            <ListaProjeto
                dados={arrayData}
                idProjetoSuperior=""
                labelBtnAddProjeto="Adicionar Projeto"
            />


            <FormProjeto />

        </div>

    );
}

export default CadastroProjetosLayout;