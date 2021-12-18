import React, { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';
import NumberFormatOriginal from 'react-number-format';

interface IProps {
    id?: string; 
    name: string; 
    label: string; 
    placeholder?: string; 
    fullWidth?: boolean;
}

const NumberFormat: React.FC<IProps> = ({ id, name, label, placeholder, fullWidth }) => {

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

    return (
        <NumberFormatOriginal
        id={id}
        placeholder={placeholder}
        name={name}
        label={label}
        fullWidth={(fullWidth === undefined)? true : fullWidth}

        displayType={'input'}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        // allowedDecimal=","
        decimalScale={2}
        // defaultValue={}
        prefix={'R$ '}
        customInput={props => <TextField {...props} size="small" />}

        inputRef={inputRef}

        // value={value}
        // onBlur={event => setValue(event.target.value)}

        // value={formik.values.custo}
        // onBlur={formik.handleChange}
        // error={formik.touched.custo && Boolean(formik.errors.custo)}
      />
    );
}

export default NumberFormat;