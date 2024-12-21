"use client";
import Box from '@mui/material/Box';

import { useBoolean } from '@gc-broadcast-web/hooks/use-boolean';
import { useResponsive } from '@gc-broadcast-web/hooks/use-responsive';
import { useSettingsContext } from '@gc-broadcast-web/components/settings';
import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  navData: any;
};

export default function DashboardLayout({ children, navData }: Props) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini navData={navData} />;

  const renderHorizontal = <NavHorizontal navData={navData} />;

  const renderNavVertical = <NavVertical navData={navData} openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
}


