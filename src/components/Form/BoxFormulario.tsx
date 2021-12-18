import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface IPropsBoxFormulario {
    titulo?: string;
    // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const BoxFormulario: React.FC<IPropsBoxFormulario> = ({ titulo, children }) => {

    return (<Paper sx={{ padding: '20px 20px 5px 5px' }} elevation={0} >
        <Typography variant="h4" component="h4" paddingLeft={1} >{titulo}</Typography>
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
    )
};

export default BoxFormulario;