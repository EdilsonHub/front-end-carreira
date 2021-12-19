import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material';
import FormularioProjeto from '../FormularioProjeto/FormularioProjeto';
import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";
import Projetos from "../Projetos";


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

    function submit(dados: IDadosFormulario): void {
        setArrayData([...arrayData, dados]);
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <Grid container className="coisas">
                <Grid xs>
                    <Projetos dados={arrayData} />
                </Grid>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid xs>
                    <FormProjeto onSubmit={submit} />
                </Grid>
            </Grid>
        </div>

    );
}

export default CadastroProjetosLayout;