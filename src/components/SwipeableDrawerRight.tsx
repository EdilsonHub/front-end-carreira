import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useSelector, useDispatch } from 'react-redux';
import { selectData, showFormulario } from '../store/FormProjeto.store';


const SwipeableDrawerRight: React.FC = ({ children }) => {
    // const [state, setState] = React.useState<boolean>(false);

    const controlsForm = useSelector(selectData);
    const dispatch = useDispatch()

    return (
        <div>
            <SwipeableDrawer
                anchor="right"
                open={controlsForm.visibilidade}
                onClose={() => dispatch(showFormulario(false))}
                onOpen={() => dispatch(showFormulario(true))}
            >
                <Box
                    sx={{ maxWidth: 500 }}
                    role="presentation"
                >
                    {children} 
                    {/* Este componente foi criado para ser usado por qualquer componente filho, no entanto ele esta travado no uso do formulario */}
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default SwipeableDrawerRight;