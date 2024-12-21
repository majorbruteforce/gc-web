import React from 'react';
import {RHFUpload} from '../../hook-form/rhf-upload';
import Box from '@mui/material/Box';

import {Controller, useFormContext} from 'react-hook-form';

export declare type FormInputFileProps = {
  name: string;
  label?: string;
  maxSize?: number;
  accept?: string;
};

const FormInputFile = ({name, maxSize = 3145728, accept = 'image/*'}: FormInputFileProps): JSX.Element => {
  const {control} = useFormContext();

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
      render={({field}) => (
        <Box sx={{mb: 5}}>
          <RHFUpload
            name={name}
            accept={accept}
            maxSize={maxSize}
            onDrop={handleDrop((value) => field.onChange({target: {value}}))}
          />
        </Box>
      )}
    />
  );
};

export default FormInputFile;
