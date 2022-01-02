import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from 'react-redux';

import LightTooltip from '../LightTooltip';

import { setIdProjetoSuperior, setVisibilidade, setIdProjeto, setNomeFormulario } from '../../store/FormProjeto.store';
import { removeProjeto } from '../../store/Projetos.store';


interface ITooltips {
    adicionar: string;
    editar: string;
    deletar: string;
    agendar: string;
};

interface IProps {
    idProjeto: string;
    nomeProjeto: string
    tooltips: ITooltips;
    projetoConcluido: boolean
}

const MenuProjeto: React.FC<IProps> = ({ idProjeto, tooltips, nomeProjeto, projetoConcluido }) => {
    const dispatch = useDispatch();
    const { adicionar, editar, deletar /*, agendar */ } = tooltips;

    const handleOnclickAdd = () => {
        dispatch(setIdProjeto(''));
        dispatch(setIdProjetoSuperior(idProjeto));
        dispatch(setNomeFormulario(`Cadastrar subprojeto: ${nomeProjeto}`));
        dispatch(setVisibilidade(true));

    }

    const handleOnclikEdit = () => {
        dispatch(setIdProjetoSuperior(''));
        dispatch(setIdProjeto(idProjeto));
        dispatch(setNomeFormulario(`Editar: ${nomeProjeto}`));
        dispatch(setVisibilidade(true));
    }

    const handleOnclickRemove = () => {
        dispatch(removeProjeto(idProjeto));
    }

    return (
        <>
            <LightTooltip title={adicionar} placement="top-start">
                <IconButton onClick={handleOnclickAdd}>
                    <AddIcon color="primary" />
                </IconButton>
            </LightTooltip>
            {!projetoConcluido && <>
                <LightTooltip title={editar} placement="top-start">
                    <IconButton onClick={handleOnclikEdit}>
                        <EditIcon color="primary" />
                    </IconButton>
                </LightTooltip>

                <LightTooltip title={deletar} placement="top-start">
                    <IconButton onClick={handleOnclickRemove}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </LightTooltip>
            </>
            }
            {/* <LightTooltip title={agendar} placement="top-start">
                <IconButton>
                    <AccessTimeIcon color="secondary" />
                </IconButton>
            </LightTooltip> */}
        </>
    );
}

export default MenuProjeto;