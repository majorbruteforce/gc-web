import * as React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, DatePickerProps} from "@mui/x-date-pickers/DatePicker";

export declare interface RHFDateProps extends DatePickerProps<Date> {
  name: string;
  label: string;
}

export default function FormInputDatePicker({name, label}: RHFDateProps): JSX.Element {
  // const timeNow = new Date();
  // const [value, setValue] = React.useState<Dayjs | null>(null);
  const {control} = useFormContext();

  // const handleChange = (newValue: Dayjs | null) => {
  // 	setValue(newValue);
  // };

  // useEffect(() => {
  //   // console.log("::: ", props);
  //   // if (props.value) setValue(dayjs(props.value));
  // }, [props.value]);

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            value={dayjs(field.value)}
            onChange={(newValue) => field.onChange(newValue)}
            renderInput={(params) => <TextField {...params} error={!!error} {...field} />}
          />
        </LocalizationProvider>
      )}
    />
  );
}
