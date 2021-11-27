import React, { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';

interface IProps {
    value?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error?: boolean | undefined;
    helperText?: string | false | undefined;
}

// interface IProps {
//     controller: IController;
// };

const Descricao: React.FC<IProps> = ({ value, onChange, error, helperText }) => {
    return (<TextField
        id="formulario-projeto-descricao"
        label="Descrição do projeto"
        multiline
        rows={4}
        fullWidth
        placeholder="Digite a descrição do projeto"
        name="descricao"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        size="small"
    />);
}

export default Descricao;
