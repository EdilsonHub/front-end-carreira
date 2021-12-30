import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import SwipeableDrawerRight from "../../SwipeableDrawerRight";

import { useSelector, useDispatch } from 'react-redux';
import { selectData, setVisibilidade } from '../../../store/FormProjeto.store';

interface IPropsBoxFormulario {
    titulo?: string;
    // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const BoxFormulario: React.FC<IPropsBoxFormulario> = ({ titulo, children }) => {

    const controlsForm = useSelector(selectData);
    const dispatch = useDispatch()

    return (
        <SwipeableDrawerRight
            visibilidade={controlsForm.visibilidade}
            anchor="right"
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
        </SwipeableDrawerRight>
    )
};

export default BoxFormulario;