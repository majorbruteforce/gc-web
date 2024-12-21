import Avatar from "@mui/material/Avatar";
import { User } from "@gc-broadcast-web/redux/types/User";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import config from "@gc-broadcast-web/config/env";
import React from "react";
import { tooltipClasses, TooltipProps } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import Iconify from "@gc-broadcast-web/components/iconify";
import Button from "@mui/material/Button";
import Link from "next/link";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: '#f5f5f9',
    // color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    // border: '1px solid #dadde9',
  },
}));

const UserTableItem = ({ user }: { user?: User }) => {

  if (!user) return null;

  return (
    <HtmlTooltip title={
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar alt={user.firstName + ' ' + user.lastName} src={config.paths.cdn + user.avatar} sx={{ mr: 2, mt: 1 }} />

        <ListItemText
          primary={user.firstName + ' ' + user.lastName + (user.employeeId ? ` ( ${user.employeeId} )` : '')}
          secondary={
            <div>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="teenyicons:id-outline" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
                {user.designation}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="ic:outline-email" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
                {user.email}
              </Box>
              <Button
                size="small"
                // variant={'outlined'}
                color={'info'}
                endIcon={
                  <Iconify width={18} icon="oui:sort-right" sx={{ mr: -0.75 }} />
                }
                href={'/users/' + user._id}
                component={Link}
                sx={{
                  px: 1
                }}
              >
                {'Visit Profile'}
              </Button>
            </div>
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'subtitle2',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            noWrap: true,
            display: 'flex',
            component: 'span',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />

      </Box>
    } placement="top">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={user.firstName} src={config.paths.cdn + user.avatar} sx={{ mr: 2 }} />

        <ListItemText
          primary={user.firstName + ' ' + user.lastName}
          secondary={user.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </Box>
    </HtmlTooltip>
  )
}

export default UserTableItem;
