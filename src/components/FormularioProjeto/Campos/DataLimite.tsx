import React, { useContext } from 'react';
import { Collapse, TextField } from '@mui/material';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { DateTimePicker } from '@mui/lab';
import { FormikProps } from 'formik';

const DataLimite: React.FC = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if (!formik) {
        return (
            <div>O component DataLimite nome não pode ser carregado!</div>
        )
    }

    return (
        <Collapse in={formik.values.ativarDataLimite} >
            <DateTimePicker
                disabled={false}
                label="Data limite"
                value={formik.values.dataLimite}

                onChange={(data) => formik.setValues({ ...formik.values, dataLimite: data })}

                renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} name="dataLimite" /> }}
            />
        </Collapse>);
}

export default DataLimite;