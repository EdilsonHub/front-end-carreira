import React, { useEffect, useState } from "react";

import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";
import ListaProjeto  from "../ListaProjeto";


import { useDispatch, useSelector } from 'react-redux';


import { salvar, selectData } from '../../store/FormProjeto.store';

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<IDadosFormulario[]>([]);

    const dispatch = useDispatch();
    const controlsForm = useSelector(selectData);

    useEffect(
        () => setArrayData(controlsForm.projetos.filter(n => !n.idProjetoSuperior)),
        [controlsForm]
    );

    function submit(dados: IDadosFormulario): void {
        dispatch(salvar(dados));
    }

    return (
        <div style={{ backgroundColor: '#ddd' }}>

            <ListaProjeto
                dados={arrayData}
                idProjetoSuperior=""
                labelBtnAddProjeto="Adicionar Projeto"
            />


            <FormProjeto onSubmit={submit} />

        </div>

    );
}

export default CadastroProjetosLayout;