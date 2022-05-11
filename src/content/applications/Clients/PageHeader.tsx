import { useState } from 'react';

import { CreateClientPayload } from 'src/common/api/clients/clients.types';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

import { ClientFormModal } from './ClientFormModal';
import { useClients } from './context';

function PageHeader() {
  const { createClient } = useClients();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const onCreateClient = async (client: CreateClientPayload) => {
    await createClient(client);
  };

  return (
    <>
      <ClientFormModal
        title="Add Client"
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={onCreateClient}
      />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Clients
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setCreateModalOpen(true)}
          >
            Add Client
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
