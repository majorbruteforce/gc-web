import {useSnackbar} from 'notistack';

const useHandleError = (): ((defaultMessage?: string) => (error: any) => void) => {
  const {enqueueSnackbar} = useSnackbar();
  return (defaultMessage = 'Something went wrong') =>
    (error) => {
      let message = error.message ? error.message : defaultMessage;
      switch (error.code) {
        case 401:
          message = 'Not Authenticated';
          break;
      }
      enqueueSnackbar(message, {variant: 'error'});
    };
};

export default useHandleError;
