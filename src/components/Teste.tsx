import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import FormProjeto from './Form/FormProjeto';

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState<boolean>(false);


    return (
        <div>
            <Button onClick={() => setState(true)}>Lateral</Button>
            <SwipeableDrawer
                anchor="right"
                open={state}
                onClose={() => setState(false)}
                onOpen={() => setState(true)}
            >
                <Box
                    sx={{ maxWidth: 500 }}
                    role="presentation"
                >
                    <FormProjeto onSubmit={e => console.log(e)} />
                </Box>
            </SwipeableDrawer>
        </div>
    );
}