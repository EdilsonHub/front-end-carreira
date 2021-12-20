import React, { Children, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, CardActionArea, CardContent, CardHeader, Collapse, Divider, Grid, Icon, IconButton, Typography } from '@mui/material';

import { IDadosFormulario, IDadosFormulario as IDadosFormulations } from './Form/FormProjeto';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
    dados: IDadosFormulations[];
}

interface IPropsItemLista {
    key?: string;
    nome: string;
    custoPrevisto: string;
    descricao: string;
    dataLimite: string;
    agenda: {
        inicio: string;
        fim: string;
    },
    tempoPrevisto: {
        meses: string;
        dias: string;
        horas: string;
        minutos: string;
    }
}

interface IDetalhes {
    value: string;
    label: string;
}
const Detalhes: React.FC<IDetalhes> = ({ value, label }) => {
    return (
        <Typography paragraph sx={{ color: 'text.secondary', textAlign: 'justify' }}>
            <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {label}
            </Typography>
            {value}
        </Typography>)
}

const montarStringTempoPrevito = ({ meses, dias, horas, minutos }: { meses: string, dias: string, horas: string, minutos: string }) => {
    const formulaStringPlural = (labelSingular: string, labelPlural: string, value: string) => {
        return (Number(value) > 1) ? `${value} ${labelPlural}` : `${value} ${labelSingular}`;
    };
    const mes = meses ? formulaStringPlural("mes", "meses", meses) : "";
    const dia = dias ? formulaStringPlural("dia", "dias", dias) : "";
    const hora = horas ? formulaStringPlural("hora", "horas", horas) : "";
    const minuto = minutos ? formulaStringPlural("minuto", "minutos", minutos) : "";

    let arrayFiltrado = [mes, dia, hora, minuto].filter(n => !!n);

    if (arrayFiltrado.length < 2) return arrayFiltrado.join(" e ");

    arrayFiltrado = arrayFiltrado.reverse();
    arrayFiltrado[1] = `${arrayFiltrado[1]} e ${arrayFiltrado[0]}`;
    arrayFiltrado = arrayFiltrado.reverse();
    arrayFiltrado.pop();

    return arrayFiltrado.join(", ");

}

const montarStringAgenda = ({ inicio, fim }: { inicio: string, fim: string }) => {
    return (inicio || fim) ? `${inicio} à ${fim}` : "";
}

export const Projeto: React.FC<IPropsItemLista> = ({ children, nome, descricao, key, dataLimite, tempoPrevisto, custoPrevisto, agenda }) => {

    const [detalhado, setDetalhado] = useState<boolean>(false);
    const cssTitulo = dataLimite ? { width: 'calc(100% - 140px)', flexShrink: 0 } : { flexShrink: 0 };
    const tempoPrevistoString = montarStringTempoPrevito(tempoPrevisto);
    const agendaString = montarStringAgenda(agenda);
    const labelBtnAgenda = agendaString ? 'Editar Agenda' : 'Agendar'

    return (
        <Accordion expanded={detalhado} key={key} onChange={() => setDetalhado(prev => !prev)}>

            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id={"panel2bh-header-" + key}
            >
                <Typography sx={cssTitulo} variant="h6" component="h6"  >{nome}</Typography>

                {!!dataLimite && <Typography sx={{ color: 'text.secondary', textAlign: 'end', alignSelf: 'center' }}>{dataLimite}</Typography>}
            </AccordionSummary>

            <AccordionDetails sx={{ backgroundColor: '#F5F5F5' }}>
                {!!descricao && <Detalhes value={descricao} label="Descrição: " />}

                <Grid container justifyContent="space-between">
                    <Grid item>
                        {!!custoPrevisto && <Detalhes value={custoPrevisto} label="Custos Previsto: " />}
                    </Grid>
                    <Grid item>
                        {!!tempoPrevistoString && <Detalhes value={tempoPrevistoString} label="Tempo Previsto: " />}
                    </Grid>
                    <Grid item >
                        {!!agendaString && <Detalhes value={agendaString} label="Agendado: " />}
                    </Grid>
                </Grid>


                {children && <Box component="div" sx={{ mb: 3, boxShadow: '0 0 10px #ccc' }} >
                    {children}
                </Box>}



                <ButtonGroup variant="contained" size="small"  color="inherit" fullWidth aria-label="outlined primary button group">
                    <Button color="error" disabled={!!agendaString} >Remover Projeto</Button>
                    <Button color="secondary" >{labelBtnAgenda}</Button>
                    <Button color="secondary" >Editar Projeto</Button>
                    <Button color="primary">Adicionar Novo</Button>
                </ButtonGroup>

            </AccordionDetails >

        </Accordion >
    );
}



const ListaProjeto: React.FC<IProps> = ({ dados }) => {

    return (
        <div>
            {
                dados.map((props: IDadosFormulations, index: number, array: IDadosFormulations[]) => (
                    <Projeto key={index.toString()} {...props} />
                ))
            }
        </div>
    );
}

export default ListaProjeto;