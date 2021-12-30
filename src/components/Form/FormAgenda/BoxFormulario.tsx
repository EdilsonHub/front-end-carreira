import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import SwipeableDrawerRight from '../../SwipeableDrawerRight';

import { useSelector, useDispatch } from 'react-redux';
import { selectFormAgenda, setVisibilidade } from '../../../store/FormAgenda.store';

interface IPropsBoxFormulario {
    titulo: string
};

const BoxFormulario: React.FC<IPropsBoxFormulario> = ({ children, titulo }) => {

    const formAgendas = useSelector(selectFormAgenda);
    const dispatch = useDispatch()

    return (<SwipeableDrawerRight
        visibilidade={formAgendas.visibilidade}
        anchor="bottom"
        onOpen={() => dispatch(setVisibilidade(true))}
        onClose={() => dispatch(setVisibilidade(false))}
    >
        <Paper sx={{ p: 1, marginRight: 2 }} elevation={0} >
            <Typography variant="h5" component="h6" paddingLeft={1} align="center" >{titulo}</Typography>
            <Box
                component="div"
                sx={{
                    '& .MuiTextField-root': { m: 1 }
                }}
            // noValidate
            // autoComplete="off"
            // onSubmit={handleSubmit}
            >

                {children}

            </Box>
        </Paper>
    </SwipeableDrawerRight>)
}

export default BoxFormulario;