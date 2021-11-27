import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

interface IProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error: boolean | undefined;
    helperText: string | false | undefined;
}

const CustoPrevisto: React.FC<IProps> = ({ value, onChange, error, helperText }) => {
    return (<NumberFormat
        displayType={'input'}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        // allowedDecimal=","
        decimalScale={2}
        defaultValue={0}
        prefix={'R$ '}  
        customInput={props => <TextField {...props} size="small" />}

        id="formulario-projeto-custo"
        label="Custo previsto (R$)"
        multiline
        maxRows={4}
        fullWidth
        placeholder="Digite o custo previsto do projeto"
        name="custo"

        onBlur={onChange}
        value={value}
        error={error}
        helperText={helperText}
    />);
}

export default CustoPrevisto;
