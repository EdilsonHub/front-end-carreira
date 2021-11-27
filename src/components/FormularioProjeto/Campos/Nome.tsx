import React, { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';

interface IProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error: boolean | undefined;
    helperText: string | false | undefined;
}

// interface IProps {
//     controller: IController;
// };

const Nome: React.FC<IProps> = ({ value, onChange, error, helperText }) => {
    return (<TextField
        id="formulario-projeto-nome"
        label="Nome do Projeto"
        multiline
        maxRows={4}
        fullWidth
        placeholder="Digite o nome do projeto"
        name="nome"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        size="small"
    />);
}

    export default Nome;
