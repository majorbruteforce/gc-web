import * as React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {BaseTextFieldProps} from '@mui/material/TextField/TextField';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

export declare interface RHFSelectProps extends BaseTextFieldProps {
  name: string;
  label: string;
}

export default function FormInputTimePicker({name, label}: RHFSelectProps): JSX.Element {
  const timeNow = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(timeNow));
  const {control} = useFormContext();

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={label}
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} error={!!error} {...field} />}
          />
        </LocalizationProvider>
      )}
    />
  );
}
