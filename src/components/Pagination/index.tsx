import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PaginationOptions } from 'src/utils';

import { Pagination as MaterialPagination, styled } from '@mui/material';

import { PaginationState } from './pagination.types';

const PaginationComponent = styled(MaterialPagination)`
  margin: 15px;
`;

type Props = {
  currentPage: number;
  size: number;
  onChange(_page: number): void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  size,
  onChange
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <PaginationComponent
      count={size}
      page={currentPage}
      onChange={handleChange}
    />
  );
};

export function usePagination(): [number, number, PaginationState['gotoPage']] {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const gotoPage = async (newPage: number) => {
    const page = Math.max(newPage, 1);
    setSearchParams(new URLSearchParams(`page=${page}`));
    setSkip((page - 1) * PaginationOptions.limit);
    setPage(page);
  };

  return [skip, page, gotoPage];
}
