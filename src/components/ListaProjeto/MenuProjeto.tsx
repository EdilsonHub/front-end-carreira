import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from 'react-redux';

import LightTooltip from './LightTooltip'

import { openNovo } from '../../store/FormProjeto.store';

interface ITooltips {
    adicionar: string;
    editar: string;
    deletar: string;
    agendar: string;
};

interface IProps {
    idProjeto: string;
    tooltips: ITooltips;
}

const MenuProjeto: React.FC<IProps> = ({ idProjeto, tooltips }) => {
    const dispatch = useDispatch();
    const { adicionar, editar, deletar, agendar } = tooltips;

    return (
        <>
            <LightTooltip title={adicionar} placement="top-start">
                <IconButton onClick={() => dispatch(openNovo(idProjeto))}>
                    <AddIcon color="primary" />
                </IconButton>
            </LightTooltip>
            <LightTooltip title={editar} placement="top-start">
                <IconButton>
                    <EditIcon color="primary" />
                </IconButton>
            </LightTooltip>
            <LightTooltip title={agendar} placement="top-start">
                <IconButton>
                    <AccessTimeIcon color="secondary" />
                </IconButton>
            </LightTooltip>

            <LightTooltip title={deletar} placement="top-start">
                <IconButton>
                    <DeleteIcon color="error" />
                </IconButton>
            </LightTooltip>
        </>
    );
}

export default MenuProjeto;