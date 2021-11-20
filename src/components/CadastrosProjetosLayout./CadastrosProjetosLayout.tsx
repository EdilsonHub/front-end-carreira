import React, { useState } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import FormularioProjeto from '../FormularioProjeto/FormularioProjeto';

interface dadosFormulario {
    nome: string,
    custo: string,
    descricao: string,
    tempo: string
}

interface arrayDataFormulario {
    dados: dadosFormulario[]
}

function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<dadosFormulario[]>([]);

    function submit(dados: dadosFormulario): void {
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
                        arrayData.map((dados: dadosFormulario) => (
                            <Card sx={{ margin: '15px' }} >
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