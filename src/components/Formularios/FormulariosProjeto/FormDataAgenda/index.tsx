import { DateTimePicker } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const FormDataAgenda: React.FC = () => {
    const [inicioAgenda, setInicioAgenda] = useState<Date | null>(null);
    const [fimAgenda, setFimAgenda] = useState<Date | null>(null);

    return (
        <Grid container xs>
        <Grid item xs={6}>
            <DateTimePicker
                disabled={false}
                label="Inicio agenda"
                value={inicioAgenda}


                onChange={(data) => setInicioAgenda(data)}

                renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}

            />

        </Grid>
        <Grid item xs={6}>
            <DateTimePicker
                disabled={false}
                label="Fim Agenda"
                value={fimAgenda}

                onChange={(data) => setFimAgenda(data)}

                renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
            />

        </Grid>
    </Grid>
    )
}
export default FormDataAgenda;