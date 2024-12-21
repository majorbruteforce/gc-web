import * as Yup from 'yup';
import React from 'react';
import { FormProvider } from './../hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FormInputElement, { FormInputElementProps } from './FormInputElement';
import { Box } from '@mui/material';
import createSchema from './create-schema';
import { ButtonProps } from '@mui/material/Button/Button';
import { LoadingButton } from '@mui/lab';
import useHandleError from "@gc-broadcast-web/hooks/useHandleError";
import Stack from "@mui/material/Stack";
// import useHandleError from './../hooks/useHandleError';

export declare type FormFields = {
  required?: boolean;
} & FormInputElementProps;

declare type FormElementProps = {
  fields: FormFields[];
  defaultValue?: {
    [key: string]: any;
  };
  submit?: {
    label?: string;
  } & ButtonProps;
  onSubmit?: (values: { [key: string]: any }, { reset }: { reset: any }) => Promise<any>;
};

const FormElement = ({ fields, defaultValue = {}, submit = {}, onSubmit }: FormElementProps): JSX.Element => {
  const handleError = useHandleError();

  const shapeObj = createSchema(fields);

  const NewUserSchema = Yup.object().shape(shapeObj);

  // console.log({shapeObj})

  // const NewUserSchema = Yup.object().shape({
  // 	name: Yup.string().required('Name is required'),
  // 	email: Yup.string().required('Email is required').email(),
  // 	phoneNumber: Yup.string().required('Phone number is required'),
  // 	address: Yup.string().required('Address is required'),
  // 	country: Yup.string().required('country is required'),
  // 	company: Yup.string().required('Company is required'),
  // 	state: Yup.string().required('State is required'),
  // 	city: Yup.string().required('City is required'),
  // 	role: Yup.string().required('Role Number is required'),
  // 	avatar: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  // });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: defaultValue,
  });

  const {
    reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const submitHandler = handleSubmit(
    async (values) =>
      await onSubmit?.(values, { reset }).catch((error) => {
        handleError()(error);
        throw error;
      }),
  );

  const { label: submitLabel, ...buttonProps } = submit;

  return (
    <Box width="100%" py={2}>
      <FormProvider methods={methods} onSubmit={submitHandler}>
        <Stack gap={2}>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {fields.map(({ required, ...each }) => (
            <FormInputElement {...each} key={each.name} />
          ))}
        </Stack>
        <Box mb={2} />
        <LoadingButton fullWidth variant="contained" {...buttonProps} type="submit" size={'large'}
          loading={isSubmitting}>
          {submitLabel || 'Submit'}
        </LoadingButton>
      </FormProvider>
    </Box>
  );
};

export default FormElement;
