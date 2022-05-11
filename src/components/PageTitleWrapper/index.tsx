import { FC, ReactNode } from 'react';

import PropTypes from 'prop-types';

import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4, 0)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <>
      <PageTitle>
        <Container maxWidth="xl">{children}</Container>
      </PageTitle>
    </>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
