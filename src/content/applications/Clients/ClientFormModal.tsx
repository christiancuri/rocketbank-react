import { FC, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import { Client } from 'src/common/api/clients/clients.types';

import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  useTheme
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

export const ClientFormModal: FC<{
  open: boolean;
  title: string;
  onClose(): void;
  initialState?: Client;
  onSave(_client: Partial<Client>): Promise<void>;
}> = ({ open, title, onClose, initialState, onSave }) => {
  const [client, setClient] = useState<Partial<Client>>({
    _id: initialState?._id || null,
    birthdate: initialState?.birthdate || '',
    cpf: initialState?.cpf || '',
    name: initialState?.name || ''
  });

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const save = async () => {
    if (!(client.name && client.cpf && client.birthdate)) {
      return;
    }

    setLoading(true);

    try {
      await onSave(client);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      onClose();
      setLoading(false);
      setClient({
        _id: null,
        birthdate: '',
        cpf: '',
        name: ''
      } as Client);
    }
  };

  useEffect(() => {
    setClient({
      _id: initialState?._id || null,
      birthdate: initialState?.birthdate || '',
      cpf: initialState?.cpf || '',
      name: initialState?.name || ''
    });
  }, [initialState]);

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
      }}
      disableEscapeKeyDown
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="Name"
              type="text"
              autoFocus
              fullWidth
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputMask
              mask="999.999.999-99"
              value={client.cpf}
              onChange={(e) => setClient({ ...client, cpf: e.target.value })}
            >
              {(inputProps: any) => (
                <TextField label="CPF" type="text" fullWidth {...inputProps} />
              )}
            </InputMask>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <MobileDatePicker
              label="Birthdate"
              value={client.birthdate}
              onChange={(value) => {
                setClient({ ...client, birthdate: value });
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          style={{
            color: theme.palette.error.main
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            color: theme.palette.primary.main
          }}
          onClick={save}
          disabled={loading}
        >
          {loading ? 'Saving' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
