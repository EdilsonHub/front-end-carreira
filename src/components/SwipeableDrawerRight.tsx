import React, { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


interface IProps {
    anchor: "top" | "left" | "right" | "bottom" | undefined;
    visibilidade: boolean;
    onClose: (event: SyntheticEvent<{}, Event>) => void;
    onOpen: (event: SyntheticEvent<{}, Event>) => void;
}

const SwipeableDrawerRight: React.FC<IProps> = ({ children, anchor, visibilidade, onClose, onOpen }) => {
    // const [state, setState] = React.useState<boolean>(false);

    return (
        <div>
            <SwipeableDrawer
                anchor={anchor}
                open={visibilidade}
                onClose={onClose}
                onOpen={onOpen}
            >
                <Box
                    sx={(anchor === "right" || anchor === "left")? { maxWidth: 500 }: {}}
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