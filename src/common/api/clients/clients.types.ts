export type Client = {
  _id: string;
  name: string;
  cpf: string;
  birthdate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateClientPayload = Pick<Client, 'name' | 'birthdate' | 'cpf'>;
export type UpdateClientPayload = CreateClientPayload & Pick<Client, '_id'>;
