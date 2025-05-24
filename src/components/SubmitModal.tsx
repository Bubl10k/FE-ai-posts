import { Box, Button, Dialog, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
  onSubmit: () => void;
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  yesText?: string;
  noText?: string;
  minWidth?: string;
  maxWidth?: string;
  children?: React.ReactNode;
};

const SubmitModal = ({
  open,
  onClose,
  onSubmit,
  onCancel,
  title,
  description,
  yesText = 'Yes',
  noText = 'No',
  minWidth,
  maxWidth,
  children,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onClick={e => e.stopPropagation()}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
          p: '24px',
          minWidth: minWidth || '400px',
          maxWidth: maxWidth || 'none',
          background: theme => theme.palette.common.white,
        },
        zIndex: 100000,
      }}
    >
      <Stack gap={2}>
        {title && (
          <Typography fontSize={'24px'} lineHeight={1.4}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography fontSize={'16px'} lineHeight={1.4}>
            {description}
          </Typography>
        )}
        {children}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Button variant="outlined" fullWidth onClick={onCancel || onClose}>
          {noText}
        </Button>
        <Button variant="contained" onClick={onSubmit} fullWidth>
          {yesText}
        </Button>
      </Box>
    </Dialog>
  );
};

export default SubmitModal;
