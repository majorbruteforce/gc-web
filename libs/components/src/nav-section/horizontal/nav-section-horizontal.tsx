import { memo } from 'react';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavGroupProps, NavProps } from '../types';
import { usePathname } from "@gc-broadcast-web/utils/routes/hooks";

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, slotProps, sx, ...other }: NavProps) {
  const router = usePathname();
  return (
    <Stack
      component="nav"
      id="nav-section-horizontal"
      direction="row"
      alignItems="center"
      spacing={`${slotProps?.gap || 6}px`}
      sx={{
        mx: 'auto',
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          hide={group?.securePath ? !router?.includes(group?.securePath) : false}
          items={group.items}
          slotProps={slotProps}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

function Group({ items, hide, slotProps }: NavGroupProps) {
  if (hide) {
    return null;
  }
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      ))}
    </>
  );
}
