import { FC } from 'react';

import { CircularProgress, Box } from '@mui/material';

export const Loading: FC<{ location?: string }> = ({ location }) => {
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          left: `${location || '50'}%`,
          top: `${location || '50'}%`,
          padding: '100px 0'
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={64} disableShrink thickness={3} />
      </Box>
    </>
  );
};
