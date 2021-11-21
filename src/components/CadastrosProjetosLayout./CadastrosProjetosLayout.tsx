import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material';
import FormularioProjeto from '../FormularioProjeto/FormularioProjeto';


interface dadosFormulario {
    nome: string,
    custo: string,
    descricao: string,
    tempo: string
}

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<dadosFormulario[]>([]);

    function submit(dados: dadosFormulario): void {
        alert(JSON.stringify(dados))
        setArrayData([...arrayData, dados]);
    }

    return (
        <>
            <Grid container>
                <Grid item xs>

                </Grid>
                <Divider orientation="vertical" flexItem >
                </Divider>
                <Grid item xs>
                    {
                        arrayData.map((dados: dadosFormulario, index: number) => (
                            <Card key={index.toString()} sx={{ margin: '15px' }} >
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {dados.nome}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {dados.descricao}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        ))
                    }
                </Grid>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid item xs>
                    <FormularioProjeto submit={submit} />
                </Grid>
            </Grid>
        </>

    );
}

export default CadastroProjetosLayout;