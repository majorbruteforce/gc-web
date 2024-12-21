import React from 'react';
import { FormElementTypes } from './constants';
// import RHFTextField, { RHFTextFieldProps } from '../../hook-form/RHFTextField';
// import RHFPhoneInput, { RHFPhoneInputProps } from '../../hook-form/RHFPhoneInput';
import FormInputAvatar, { FormInputAvatarProps } from './FormInputAvatar';
// import FormInputFiles from './FormInputFiles';
// import FormInputFile, { FormInputFileProps } from './FormInputFile';
// import RHFSelect, { RHFSelectProps } from '../../hook-form/RHFSelect';
import FormInputPassword from './FormInputPassword';
// import FormInputTimePicker from './FormInputTimePicker';
import RHFTextField, { RHFTextFieldProps } from "../../hook-form/rhf-text-field";
import { RHFMultiSelect, RHFMultiSelectProps, RHFSelect, RHFSelectProps } from "../..//hook-form/rhf-select";
import FormInputFile from "./FormInputFile";
// import FormInputFiles from "./FormInputFiles";
import RHFSwitch, { RHFSwitchProps } from "../../hook-form/rhf-switch";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormInputTimePicker from "./FormInputTimePicker";
import FormInputDatePicker from "./FormInputDatePicker";
import AutoCompletes from "@gc-broadcast-web/components/FormElement/AutoCompletes";

export declare type FormInputElementProps =
  | ({
    type:
    | FormElementTypes.FLD_TYPE_TEXT
    | FormElementTypes.FLD_TYPE_SLUG
    | FormElementTypes.FLD_TYPE_EMAIL
    | FormElementTypes.FLD_TYPE_PASSWORD
    | FormElementTypes.FLD_TYPE_NUMBER
    | FormElementTypes.FLD_TYPE_PHONE
    | FormElementTypes.FLD_TYPE_FILE
    | FormElementTypes.FLD_TYPE_FILES
    | FormElementTypes.FLD_TYPE_TEXTAREA
    | FormElementTypes.FLD_TYPE_TIME;
  } & RHFTextFieldProps)
  | ({
    type: FormElementTypes.FLD_TYPE_OPTION;
  } & RHFSelectProps)
  | ({
    type: FormElementTypes.FLD_TYPE_OPTION_MULTI;
  } & RHFMultiSelectProps)
  | ({
    type: FormElementTypes.FLD_TYPE_SWITCH;
  } & RHFSwitchProps)
  | ({
    type: FormElementTypes.FLD_TYPE_AVATAR;
  } & FormInputAvatarProps)
  | ({
    type: FormElementTypes.FLD_TYPE_AUTO_COMPLETE;
    module: 'branch'
  } & RHFTextFieldProps) | ({
    type: FormElementTypes.FLD_TYPE_SECTION_LABEL;
    name: string;
    description?: string;
  });

const FormInputElement = ({ type, name, ...props }: FormInputElementProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_TEXT || type === FormElementTypes.FLD_TYPE_EMAIL) return <RHFTextField
    name={name} {...props} />;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_NUMBER) return <RHFTextField name={name} {...props} type="number" />;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_PHONE) return <RHFTextField name={name} {...props} type="number" />;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_TEXTAREA) return <RHFTextField name={name} multiline rows={3} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_PASSWORD) return <FormInputPassword name={name} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_OPTION) return <RHFSelect name={name} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_SWITCH) return <RHFSwitch name={name} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_OPTION_MULTI) return <RHFMultiSelect name={name} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_AVATAR) return <FormInputAvatar name={name} {...props} />;


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (type === FormElementTypes.FLD_TYPE_FILE) return <FormInputFile name={name} {...props} />;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // if (type === FormElementTypes.FLD_TYPE_FILES) return <FormInputFiles name={name} {...props} />;

  if (type === FormElementTypes.FLD_TYPE_DATE) return <FormInputDatePicker name={name} {...props} />;

  if (type === FormElementTypes.FLD_TYPE_TIME) return <FormInputTimePicker name={name} {...props} />;

  if (type === FormElementTypes.FLD_TYPE_AUTO_COMPLETE) return <AutoCompletes name={name} {...props} />;

  if (type === FormElementTypes.FLD_TYPE_SECTION_LABEL) return <Box>
    <Typography variant="h6">{name}</Typography>
    {
      props?.description && <Typography variant="caption">{props?.description}</Typography>
    }
  </Box>;

  return <></>;
};

export default FormInputElement;
