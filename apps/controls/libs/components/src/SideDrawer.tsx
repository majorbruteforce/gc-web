'use client';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { paper } from '@gc-broadcast-web/utils/theme/css';
import Iconify from './iconify';
import Scrollbar from './scrollbar';
import Box from "@mui/material/Box";

export default function SideDrawer({ children, footer, onClose, open, title, width = 280 }: {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onClose?: VoidFunction;
  footer?: React.ReactNode;
  width?: number;
}) {
  const theme = useTheme();


  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width,
        },
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {children}
        </Stack>
      </Scrollbar>

      {
        Boolean(footer) && <Box sx={{ p: 2.5 }}>
          {footer}
        </Box>
      }
    </Drawer>
  );
}
