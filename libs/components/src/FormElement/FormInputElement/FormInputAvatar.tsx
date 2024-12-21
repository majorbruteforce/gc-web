import React from 'react';
import {RHFUploadAvatar} from "../../hook-form/rhf-upload";
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';

export declare type FormInputAvatarProps = {
  name: string;
  label?: string;
  maxSize?: number;
  headText?: string;
};

const FormInputAvatar = ({name, maxSize = 3145728, headText, label}: FormInputAvatarProps): JSX.Element => {
  const {control} = useFormContext();

  const handleDrop =
    (setValue: (arg0: any) => void) =>
      (acceptedFiles: any[]): void => {
        const file = acceptedFiles[0];

        if (file) {
          setValue(
            // 	'avatarUrl',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          );
        }
      };

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Box sx={{mb: 5}}>
          <RHFUploadAvatar
            name={name}
            // accept="image/*"
            maxSize={maxSize}
            onDrop={handleDrop((value) => field.onChange({target: {value}}))}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                {`${label} | `}{headText || 'Allowed *.jpeg, *.jpg, *.png, *.gif. Max size of 3.1 MB'}
              </Typography>
            }
          />
        </Box>
      )}
    />
  );
};

export default FormInputAvatar;
