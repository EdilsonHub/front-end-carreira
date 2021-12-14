import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import NumberFormat from 'react-number-format';
import * as yup from 'yup';


const FormCustoPrevisto: React.FC = () => {
    const [value, setValue] = useState<string>('value');

    return (
        <NumberFormat
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
        value={value}
        onBlur={event => setValue(event.target.value)}

        // value={formik.values.custo}
        // onBlur={formik.handleChange}
        // error={formik.touched.custo && Boolean(formik.errors.custo)}
        // helperText={formik.touched.custo && formik.errors.custo}
    />
    );
}

export default FormCustoPrevisto;