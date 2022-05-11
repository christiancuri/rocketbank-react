import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { DashboardRequests } from 'src/common/api/dashboard';
import Text from 'src/components/Text';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton
} from '@mui/material';

export function SystemInfoPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalClients, setTotalClients] = useState(0);

  const fetchSystemInfo = async () => {
    try {
      const { clients, users } = await DashboardRequests.getSystemInfo();
      setTotalUsers(users);
      setTotalClients(clients);
    } catch (error) {
      toast.error(`Failed to fetch system information`);
    }
  };

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Overview</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              action={
                <IconButton size="small" color="primary">
                  <MoreVertTwoToneIcon />
                </IconButton>
              }
              title="Registered users"
              titleTypographyProps={{
                variant: 'h5',
                color: 'textPrimary'
              }}
            />
            <CardContent sx={{ pt: 0, pb: 1 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Total:{' '}
                  <Text color="black">
                    <b>{totalUsers}</b>
                  </Text>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              action={
                <IconButton size="small" color="primary">
                  <MoreVertTwoToneIcon />
                </IconButton>
              }
              title="Registered Clients"
              titleTypographyProps={{
                variant: 'h5',
                color: 'textPrimary'
              }}
            />
            <CardContent sx={{ pt: 0, pb: 1 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Total:{' '}
                  <Text color="black">
                    <b>{totalClients}</b>
                  </Text>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
