import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { routes } from './router';
import ThemeProvider from './theme/ThemeProvider';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ToastContainer />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
