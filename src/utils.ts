export const maskCPF = (cpf: string): string =>
  (cpf || '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

export const PaginationOptions = {
  limit: 5
};
