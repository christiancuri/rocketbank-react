import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Footer from '@components/Footer';
import { Grid, Container, Card } from '@mui/material';

import { ClientsTable } from './ClientsTable';
import { ClientsProvider } from './context';
import PageHeader from './PageHeader';

function AccessKeys() {
  return (
    <ClientsProvider>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <ClientsTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ClientsProvider>
  );
}

export default AccessKeys;
