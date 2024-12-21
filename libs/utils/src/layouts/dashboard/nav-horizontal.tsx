import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useMockedUser } from '@gc-broadcast-web/hooks/use-mocked-user';

import { bgBlur } from '../../theme/css';

import Scrollbar from '@gc-broadcast-web/components/scrollbar';
import { NavSectionHorizontal } from '@gc-broadcast-web/components/nav-section';

import { HEADER } from '../config-layout';
// import { useNavData } from './config-navigation';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

function NavHorizontal({ navData }: { navData: any }) {
  const theme = useTheme();

  const { user } = useMockedUser();

  // const navData = useNavData();

  return (
    <AppBar
      component="div"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <Scrollbar
          sx={{
            '& .simplebar-content': {
              display: 'flex',
            },
          }}
        >
          <NavSectionHorizontal
            data={navData}
            slotProps={{
              currentRole: user?.role,
            }}
            sx={{
              ...theme.mixins.toolbar,
            }}
          />
        </Scrollbar>
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
