'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter, useSearchParams } from '@gc-broadcast-web/utils/routes/hooks';

import { useBoolean } from '@gc-broadcast-web/hooks/use-boolean';
import Iconify from '@gc-broadcast-web/components/iconify';
import { RHFTextField } from '@gc-broadcast-web/components/hook-form';
import FormProvider from "@gc-broadcast-web/components/hook-form/form-provider";
import restApp, { authCookieName } from "@gc-broadcast-web/utils/request/rest.app";
import { useSnackbar } from "notistack";
import config from "@gc-broadcast-web/config/index";
import envConfig from "@gc-broadcast-web/config/env";
import axios from 'axios';
import { CookieStorage } from 'cookie-storage';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
    const { enqueueSnackbar } = useSnackbar();
    // const { login } = useAuthContext();
    // const dispatch = useDispatch();

    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState('');

    const searchParams = useSearchParams();

    const returnTo = searchParams.get('returnTo');

    const password = useBoolean();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const payload = { email: data.email, password: data.password };
            await axios.post("http://localhost:3030/authentication", {
                "email": payload.email,
                "password": payload.password
            }).then((res) => {
                enqueueSnackbar('Login Successful', {
                    variant: 'success',
                });
                console.log({ res });
                // router.push(returnTo || process.env.NEXT_PUBLIC_PUBLIC_URL);
                // location.href = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
                new CookieStorage().setItem(authCookieName, res.data.access_token);
                location.href = envConfig.paths.console;
            }).catch((error: any) => {
                console.error('err', error);
                reset();
                setErrorMsg(typeof error === 'string' ? error : error?.message);
            })

            // restApp.authenticate({
            //   strategy: 'local',
            //   email: payload.email,
            //   password: payload.password,
            // }).then((res) => {
            //   enqueueSnackbar('Login Successful', {
            //     variant: 'success',
            //   });
            //   // router.push(returnTo || process.env.NEXT_PUBLIC_PUBLIC_URL);
            //   // location.href = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
            //   location.href = envConfig.paths.console;
            // }).catch((error: any) => {
            //   console.error('err', error);
            //   reset();
            //   setErrorMsg(typeof error === 'string' ? error : error?.message);
            // })
            // const res: {data: {access_token: string; user: User}} = await axios.post(endpoints.authentication, payload);
            // cookieStorage.set(TOKEN_STORAGE_KEY, res?.data?.access_token);
            // dispatch(setUserInfo(res?.data?.user));
        } catch (error: any) {
            console.error('err', error);
            reset();
            setErrorMsg(typeof error === 'string' ? error : error?.message);
        }
    });

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant="h4">Log in to {config.appName}</Typography>
            {/*<Stack direction="row" spacing={0.5}>*/}
            {/*  <Typography variant="body2">New user?</Typography>*/}
            {/*  <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">*/}
            {/*    Create an account*/}
            {/*  </Link>*/}
            {/*</Stack>*/}
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>
            <RHFTextField name="email" label="Email address" />

            <RHFTextField
                name="password"
                label="Password"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Login
            </LoadingButton>
        </Stack>
    );

    return (
        <>
            {renderHead}

            <Alert severity="info" sx={{ mb: 3 }}>
                Use the provided email address and password to enter the portal.
            </Alert>

            {!!errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMsg}
                </Alert>
            )}

            <FormProvider methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </FormProvider>
        </>
    );
}
