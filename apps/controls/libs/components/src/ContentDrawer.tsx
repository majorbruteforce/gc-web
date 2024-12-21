import React, {ReactNode} from 'react';
import {Divider, Stack, Typography} from '@mui/material';
import {AnimatePresence} from 'framer-motion';
import Iconify from './iconify/iconify';
import Scrollbar from './scrollbar/scrollbar';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";


declare type ContentDrawerType = {
  open?: boolean;
  onClose?: any;
  children?: ReactNode;
  title: string;
  maxWidth?: number;
  withContent?: boolean;
};

const ContentDrawer = ({
                         open = false,
                         onClose: handleClose = () => {
                         },
                         children,
                         title,
                         maxWidth = 500,
                         withContent = true,
                       }: ContentDrawerType): JSX.Element => {

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {maxWidth},
          }}
          scroll="body"
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{py: 2, pr: 1, pl: 2.5}}>
            <Typography variant="subtitle1">{title}</Typography>
            <div>
              <Button onClick={handleClose}>
                <Iconify icon={'eva:close-fill'} width={20} height={20}/>
              </Button>
            </div>
          </Stack>
          <Divider sx={{borderStyle: 'dashed'}}/>
          {
            withContent ? <DialogContent>
              <Scrollbar sx={{flexGrow: 1}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  {children}
                </Stack>
              </Scrollbar>
            </DialogContent> : children
          }
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ContentDrawer;
