import React from "react";
import { Grid, TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import * as yup from 'yup';


interface IValuesFormik {
    dias: string;
    meses: string;
    horas: string;
    minutos: string;
}

interface Campo {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    max: string;
    
    value: string;
    // onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error: boolean | undefined;
    helperText: string | false | undefined;
};

const FormTempoPrevisto: React.FC = () => {

    const formik: FormikProps<IValuesFormik> = useFormik<IValuesFormik>({
        initialValues: {
            dias: '',
            meses: '',
            horas: '',
            minutos: '',
        },
        validationSchema: yup.object({
            meses: yup.number().max(1200, 'Máximo 100 anos').min(0, 'Mínimo 0 minutos'),
            dias: yup.number().max(30, 'Máximo 30 dias').min(0, 'Mínimo 0 dias'),
            horas: yup.number().max(23, 'Máximo 23 horas').min(0, 'Mínimo 0 horas'),
            minutos: yup.number().max(59, 'Máximo 59 minutos').min(0, 'Mínimo 0 minutos')
        }),
        onSubmit: (values) => {
            console.log(values);
            // submit({ ...values });
            formik.resetForm();
        },
    });

    const campos: Campo[] = [
        {
            id: "formulario-projeto-tempo-meses",
            name: "meses",
            label: "Meses",
            max: "1200",

            value: formik.values.meses,
            // onChange={formik.handleChange}
            error: (formik.touched.meses && Boolean(formik.errors.meses)),
            helperText: (formik.touched.meses && formik.errors.meses),
        },
        {
            id: "formulario-projeto-tempo-dias",
            name: "dias",
            label: "Dias",
            max: "30",

            value: formik.values.dias,
            // onChange={formik.handleChange}
            error: (formik.touched.dias && Boolean(formik.errors.dias)),
            helperText: (formik.touched.dias && formik.errors.dias)
        },
        {
            id: "formulario-projeto-tempo-horas",
            name: "horas",
            label: "Horas",
            max: "23",
            
            value: formik.values.horas,
            // onChange={formik.handleChange}
            error: (formik.touched.horas && Boolean(formik.errors.horas)),
            helperText: (formik.touched.horas && formik.errors.horas)
        },
        {
            id: "formulario-projeto-tempo-minutos",
            name: "minutos",
            label: "Minutos",
            max: "59",

            value: formik.values.minutos,
            // onChange={formik.handleChange}
            error: (formik.touched.minutos && Boolean(formik.errors.minutos)),
            helperText: (formik.touched.minutos && formik.errors.minutos)
        }
    ];

    return (
        <Grid container spacing={2}>
            {campos.map((prop, index, array) => (
                <Grid key={index} xs={(array.length < 4) ? 12 / array.length : 3} item >
                    <TextField
                        id={prop.id}
                        name={prop.name}
                        label={prop.label}
                        InputProps={{ inputProps: { min: "0", step: "1", max: prop.max } }}

                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}

                        fullWidth
                        size="small"

                        value={prop.value}
                        onChange={formik.handleChange}
                        error={prop.error}
                        helperText={prop.helperText}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default FormTempoPrevisto;