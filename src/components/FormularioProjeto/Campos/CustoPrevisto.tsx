import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { FormikProps } from 'formik';



const CustoPrevisto: React.FC = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if(!formik) {
        return (
            <div>O componente CustoPrevisto nome não pode ser carregado!</div>
        );
    }


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

        value={formik.values.custo}
        onBlur={formik.handleChange}
        error={formik.touched.custo && Boolean(formik.errors.custo)}
        helperText={formik.touched.custo && formik.errors.custo}
    />);
}

export default CustoPrevisto;
