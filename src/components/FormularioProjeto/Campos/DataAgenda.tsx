import React, { useContext } from 'react';
import { Collapse, Grid, TextField } from '@mui/material';
import { FormularioProjetoContext, IValuesFormik } from '../FormularioProjetoContext';
import { DateTimePicker } from '@mui/lab';
import { FormikProps } from 'formik';

const DataAgenda: React.FC = () => {
    const formik = useContext<FormikProps<IValuesFormik> | null | undefined>(FormularioProjetoContext);
    if (!formik) {
        return (
            <div>O component DataAgenda nome não pode ser carregado!</div>
        )
    }

    return (
        <Collapse in={formik.values.cadastrarAgenda} >
            <Grid container xs>
                <Grid xs={6} alignContent="baseline" item>
                    <DateTimePicker
                        disabled={false}
                        label="Inicio agenda"
                        value={formik.values.dataInicioAgenda}


                        onChange={(data) => formik.setValues({ ...formik.values, dataInicioAgenda: data })}

                        renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}

                    />

                </Grid>
                <Grid xs={6} alignContent="baseline" item>
                    <DateTimePicker
                        disabled={false}
                        label="Fim Agenda"
                        value={formik.values.dataFimAgenda}

                        onChange={(data) => formik.setValues({ ...formik.values, dataFimAgenda: data })}

                        renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
                    />

                </Grid>
            </Grid>
        </Collapse>
    );
}

export default DataAgenda;