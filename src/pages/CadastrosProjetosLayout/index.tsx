import React, { useEffect, useState } from "react";

import FormProjeto, { IDadosFormulario } from "../../components/Form/FormProjeto";
import ListaProjeto from "../../components/ListaProjeto";

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';
import { Button, Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
            <Typography variant="h5" component="h2" color="primary" sx={{ textTransform: 'uppercase' }} >Projetos</Typography>
         
            <Box component="div" sx={{ paddingTop: 2,paddingBottom: 2, textAlign: 'right' }}>
                <Button variant="outlined" onClick={handleOnclickAddProjeto} startIcon={<AddIcon color="primary" />} >Adicionar Novo Projeto</Button>
            </Box>

            <Box>
                <ListaProjeto
                    dados={arrayData}
                    idProjetoSuperior=""
                    labelBtnAddProjeto="Adicionar Projeto"
                />


                <FormProjeto />
            </Box>

        </div>

    );
}

export default CadastroProjetosLayout;