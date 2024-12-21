import { Branch } from "@gc-broadcast-web/redux/types/Branch";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getUserInfo } from "@gc-broadcast-web/redux/global/global.selector";
import { UserRole } from "@gc-broadcast-web/redux/constants/UserRole";
import { BranchService } from "@gc-broadcast-web/utils/request/rest.app";
import { TextFieldProps } from "@mui/material/TextField/TextField";

const BranchAutoComplete = (props: {
  value: Branch;
  onSelect: (branch: Branch) => void,
  onLoaded?: VoidFunction,
  error?: string
} & TextFieldProps) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userInfo = useSelector(getUserInfo, shallowEqual);

  const { value, onSelect, error, helperText, fullWidth, ...otherProps } = props;

  useEffect(() => {
    if (userInfo?.type === UserRole.USER) {
      // todo: get branch from branch user
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setBranches(userInfo.branches || []);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (userInfo.branches.length === 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        props.onSelect(userInfo.branches[0]);
      }
    } else {
      if (isLoading) return;
      if (branches.length !== 0) return;
      setIsLoading(true);
      BranchService.find({ query: { organization: userInfo?.organization } }).then((res) => {
        props.onLoaded?.();
        setBranches(res.data);
      });
    }
  }, [userInfo]);

  if (branches.length <= 1) return null;

  return (
    <Autocomplete
      disablePortal
      options={branches}
      getOptionLabel={(option) => option.name}
      sx={{ width: fullWidth ? undefined : 250 }}
      value={value}
      onChange={(event, newValue) => {
        onSelect(newValue);
      }}
      fullWidth={fullWidth}
      renderInput={(params) => <TextField
        {...params}
        label="Branch"
        error={!!error}
        helperText={error ? error : helperText}
        {...otherProps}
      />}
    />
  );
}

export default BranchAutoComplete;
