import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { TextField as TextFieldMaterialUI } from '@mui/material';

interface IPropsInput {
    id?: string;

    label: string;
    name: string;

    placeholder?: string;
    maxRows?: number;
    rows?: number;
    fullWidth?: boolean;
    type?: string;
    multiline?: boolean; 
    InputProps?: any;
}

const TextField: React.FC<IPropsInput> = ({ id, label, name, placeholder, maxRows, rows, fullWidth, type, multiline, InputProps, ...rest }) => {
    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (<TextFieldMaterialUI
        id={id}
        label={label}
        multiline={multiline}
        maxRows={maxRows}
        rows={rows}
        fullWidth={(fullWidth === undefined) ? true : fullWidth}
        placeholder={placeholder}
        name={name}
        size="small"

        type={type}

        InputProps={InputProps}

        // InputLabelProps={{
        //     shrink: true,
        // }}
      

        // inputProps={{ref: inputRef}}
        inputRef={inputRef}
        defaultValue={defaultValue} 
        {...rest}
        // value={formik.values.nome}
        // onChange={formik.handleChange}

        error={!!error}
        helperText={error}
    />
    )
}

export default TextField; 