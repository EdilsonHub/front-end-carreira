import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material';
import FormularioProjeto from '../FormularioProjeto/FormularioProjeto';
import FormProjeto, { IDadosFormulario } from "../Form/FormProjeto";


function CadastroProjetosLayout() {
    const [arrayData, setArrayData] = useState<IDadosFormulario[]>([]);

    function submit(dados: IDadosFormulario): void {
        setArrayData([...arrayData, dados]);
    }

    return (
        <>
            <Grid container className="coisas">
                <Grid xs>

                </Grid>
                <Divider orientation="vertical" flexItem >
                </Divider>
                <Grid xs>
                    {
                        arrayData.map((dados: IDadosFormulario, index: number) => (
                            <Card key={index.toString()} sx={{ margin: '15px' }} >
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {dados.nome}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {dados.descricao}
                                        </Typography>
                                            <pre>{JSON.stringify(dados).replaceAll(",",",\n").replaceAll("\}","\n\}").replaceAll("\{","\{\n")}</pre>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        ))
                    }
                </Grid>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid xs>
                    <FormProjeto onSubmit={submit} />
                </Grid>
            </Grid>
        </>

    );
}

export default CadastroProjetosLayout;