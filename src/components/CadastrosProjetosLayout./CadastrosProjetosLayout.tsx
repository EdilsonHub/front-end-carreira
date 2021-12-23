import React, { useState } from "react";

import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";
import { ListaProjeto, Projeto } from "../Projetos";


import { useDispatch } from 'react-redux';


import { salvar } from '../../store/FormProjeto.store';


function valoresPrevios(): IDadosFormulario {
    return {
        id: 'id_projeto',
        nome: 'nome_projeto',
        custoPrevisto: 'valor_projeto',
        descricao: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        dataLimite: '12/12/2022 05:58',
        agenda: {
            inicio: '12/12/2022 04:58',
            fim: '12/12/2022 05:50'
        },
        tempoPrevisto: {
            meses: '1',
            dias: '4',
            horas: '3',
            minutos: '53'
        }
    }
}

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<IDadosFormulario[]>([valoresPrevios()]);

    const dispatch = useDispatch();

    function submit(dados: IDadosFormulario): void {
        dispatch(salvar(dados));
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            {/* <Grid container className="coisas">
                <Grid xs>
                    <ListaProjeto dados={arrayData} />
                </Grid>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid xs>
                    <FormProjeto onSubmit={submit} />
                </Grid>
            </Grid> */}
            <ListaProjeto dados={[...arrayData, ...arrayData]}>
                <ListaProjeto dados={[...arrayData, ...arrayData]} />
            </ListaProjeto>

            <FormProjeto onSubmit={submit} />
            
        </div>

    );
}

export default CadastroProjetosLayout;