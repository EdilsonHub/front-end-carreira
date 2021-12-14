import { DateTimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

const FormDataLimite: React.FC = () => {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <DateTimePicker
            disabled={false}
            label="Data limite"
            value={value}

            onChange={(data) => setValue(data)}

            renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} name="dataLimite" /> }}
        />
    )
}

export default FormDataLimite;