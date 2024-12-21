import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from '@gc-broadcast-web/utils/routes/hooks';

import { useAuthContext } from '@gc-broadcast-web/utils/auth/hooks';

import { varHover } from '@gc-broadcast-web/components/animate';
import CustomPopover, { usePopover } from '@gc-broadcast-web/components/custom-popover';
import { shallowEqual, useSelector } from "react-redux";
import { getUserInfo } from "@gc-broadcast-web/redux/global/global.selector";
import { CookieStorage } from 'cookie-storage';
import restApp, { authCookieName } from "@gc-broadcast-web/utils/request/rest.app";
import config from "@gc-broadcast-web/config/env";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Dashboard',
    linkTo: '/dashboard',
  },
  {
    label: 'Profile',
    linkTo: '/profile',
  },
  {
    label: 'Settings',
    linkTo: '/settings',
  },
];


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const cookieStorage = new CookieStorage();
  const userInfo = useSelector(getUserInfo, shallowEqual);

  const { logout } = useAuthContext();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await restApp.logout();
      cookieStorage.removeItem(authCookieName);
      popover.onClose();
      window.location.href = config.paths.auth;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          // src={user?.photoURL}
          alt={userInfo?.firstName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userInfo?.firstName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userInfo?.firstName} {userInfo?.lastName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userInfo?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*<Stack sx={{ p: 1 }}>*/}
        {/*  {OPTIONS.map((option) => (*/}
        {/*    <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>*/}
        {/*      {option.label}*/}
        {/*    </MenuItem>*/}
        {/*  ))}*/}
        {/*</Stack>*/}

        {/*<Divider sx={{ borderStyle: 'dashed' }} />*/}

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
