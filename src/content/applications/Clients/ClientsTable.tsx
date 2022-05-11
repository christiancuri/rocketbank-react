import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import {
  Client,
  UpdateClientPayload
} from 'src/common/api/clients/clients.types';
import { Loading } from 'src/components/Loading';
import { maskCPF } from 'src/utils';

import { Pagination } from '@components/Pagination';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

import { ClientFormModal } from './ClientFormModal';
import { useClients } from './context';

const ConfirmDeleteModal: FC<{
  open: boolean;
  onClose(): void;
  client: Client;
  onDelete(_id: Client['_id']): void;
}> = ({ open, onClose, client, onDelete: deleteClient }) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteClient(client._id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Client</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want delete the client {client?.name} - CPF{' '}
          {maskCPF(client?.cpf)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onDelete}
          style={{
            color: theme.palette.error.main
          }}
          disabled={loading}
        >
          {loading ? 'Deleting' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ClientsTable: FC = () => {
  const {
    isLoading,
    clients,
    updateClient,
    deleteClient,
    totalPages,
    currentPage,
    gotoPage
  } = useClients();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Client>();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const onUpdateClient = async (client: UpdateClientPayload) => {
    await updateClient(client);
  };

  const theme = useTheme();

  useEffect(() => {
    if (query.get('page')) gotoPage(parseInt(query.get('page'), 10));
  }, []);

  useEffect(() => {
    if (totalPages < currentPage) gotoPage(totalPages);
  }, [totalPages]);

  return (
    <Card>
      <ConfirmDeleteModal
        client={selectedItem}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={deleteClient}
      />
      <ClientFormModal
        initialState={selectedItem}
        title="Update Client"
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSave={onUpdateClient}
      />
      <CardHeader title="Clients" />
      <Divider />
      <TableContainer>
        <Table style={{ position: 'relative' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Loading />
            ) : (
              clients?.map((client, index) => {
                return (
                  <TableRow hover key={client._id}>
                    <TableCell padding="checkbox">{index}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {client.name || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {maskCPF(client.cpf) || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {client.birthdate}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Client" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSelectedItem(client);
                            setUpdateModalOpen(true);
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Client" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSelectedItem(client);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          size={totalPages}
          onChange={gotoPage}
        />
      </TableContainer>
    </Card>
  );
};
