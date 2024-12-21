import React from 'react';
import { RHFUpload } from '../../hook-form/rhf-upload';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { fData } from "@gc-broadcast-web/utils/format-number";

export declare type FormInputFilesProps = {
  name: string;
  label?: string;
  maxSize?: number;
};

const FormInputFiles = ({ name, maxSize = 3145728 }: FormInputFilesProps): JSX.Element => {
  const { control } = useFormContext();

  const handleDrop =
    (setValue: (arg0: any) => void) =>
      (acceptedFiles: any[]): void => {
        const file = acceptedFiles[0];

        if (file) {
          setValue(
            // 	'FilesUrl',
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
      render={({ field }) => (
        <Box sx={{ mb: 5 }}>
          <RHFUpload
            name={name}
            multiple={true}
            accept="image/*"
            maxSize={maxSize}
            onDrop={handleDrop((value) => field.onChange({ target: { value } }))}
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
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(maxSize)}
              </Typography>
            }
          />
        </Box>
      )}
    />
  );
};

export default FormInputFiles;
