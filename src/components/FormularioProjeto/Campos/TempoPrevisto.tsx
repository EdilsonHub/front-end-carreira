import * as React from 'react';
import { Grid, TextField } from '@mui/material';

interface Campo {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    max: string;

    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error: boolean | undefined;
    helperText: string | false | undefined;
};

interface IProps {
    campos: Campo[];
};

const TempoPrevisto: React.FC<IProps> = ({ campos }) => {
    return (
        <Grid container spacing={2}>
            {campos.map((prop, index, array) => (
                <Grid key={index} xs={(array.length < 4)? 12/array.length: 3} item >
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
                        onChange={prop.onChange}
                        error={prop.error}
                        helperText={prop.helperText}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TempoPrevisto;