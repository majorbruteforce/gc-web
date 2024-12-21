import {Controller, useFormContext} from "react-hook-form";
import {TextFieldProps} from "@mui/material/TextField";
import BranchAutoComplete from "./branch-auto-complete";

export type AutoCompleteProps = TextFieldProps & {
  name: string;
};

const AutoCompletes = ({name}: AutoCompleteProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <BranchAutoComplete
          value={field.value}
          onSelect={value => field.onChange(value)}
          error={error?.message}
          fullWidth
        />
      )}
    />
  );
}

export default AutoCompletes;
