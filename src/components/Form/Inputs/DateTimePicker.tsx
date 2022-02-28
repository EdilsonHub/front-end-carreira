import React, { useEffect, useRef, useState } from "react";
import { DateTimePicker as DateTimePickerMaterialUI } from "@mui/lab";
import { TextField } from "@mui/material";
import { useField } from "@unform/core";

interface IProps {
  name: string;
  label: string;
}

const DateTimePicker: React.FC<IProps> = ({ name, label }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  // const [errorInterno, setErrorInterno] = useState('');

  return (
    <DateTimePickerMaterialUI
      disabled={false}
      label={label}
      inputRef={inputRef}
      // defaultValue={defaultValue}
      value={date}
      onChange={(data) => setDate(data)}
      // onError={error => setErrorInterno((error === 'invalidDate')? 'Data inválida': '')}

      renderInput={(params) => {
        params["size"] = "small";
        return (
          <TextField
            {...params}
            name={name}
            fullWidth
            error={!!error}
            helperText={error}
          />
        );
      }}
    />
  );
};

export default DateTimePicker;
