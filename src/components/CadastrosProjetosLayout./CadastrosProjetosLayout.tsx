import React, { useEffect, useState } from "react";

import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";
import ListaProjeto  from "../ListaProjeto";

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<IDadosFormulario[]>([]);

    const { dados } = useSelector(selectProjetos);

    useEffect( 
        () => {
            setArrayData(dados.filter(n => !n.idProjetoSuperior));
        },
        [dados]
    );


    return (
        <div style={{ backgroundColor: '#ddd' }}>

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