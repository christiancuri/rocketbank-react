import { FC, createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { ClientsRequests } from 'src/common/api/clients';
import {
  Client,
  CreateClientPayload,
  UpdateClientPayload
} from 'src/common/api/clients/clients.types';
import { QueryKeys } from 'src/common/react-query';

import { usePagination } from '@components/Pagination';
import { PaginationState } from '@components/Pagination/pagination.types';

type ClientsState = {
  clients: Client[];
};

type ClientsContext = ClientsState &
  PaginationState & {
    isLoading: boolean;
    createClient(_payload: CreateClientPayload): void;
    updateClient(_payload: UpdateClientPayload): void;
    deleteClient(_id: Client['_id']): void;
  };

const initialState: ClientsState = {
  clients: []
};

export const ClientsContext = createContext<ClientsContext>(
  initialState as any
);

export function useClients() {
  return useContext(ClientsContext);
}

export const ClientsProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();

  const [skip, currentPage, gotoPage] = usePagination();

  const { data: clients, isLoading } = useQuery(
    [QueryKeys.Clients, skip],
    () => ClientsRequests.getAllClients(skip),
    {
      keepPreviousData: true
    }
  );

  const mutationOptions = {
    onSuccess() {
      queryClient.invalidateQueries(QueryKeys.Clients);
    }
  };

  const { mutateAsync: createClient } = useMutation(
    ClientsRequests.createClient,
    mutationOptions
  );
  const { mutateAsync: updateClient } = useMutation(
    ClientsRequests.updateClient,
    mutationOptions
  );
  const { mutateAsync: deleteClient } = useMutation(
    ClientsRequests.deleteClient,
    mutationOptions
  );

  return (
    <ClientsContext.Provider
      value={{
        clients: clients?.clients,
        totalPages: clients?.pages,
        totalItems: clients?.totalClients,
        currentPage,
        gotoPage,
        createClient,
        updateClient,
        deleteClient,
        isLoading
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
