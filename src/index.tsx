import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { queryClient } from './common/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import * as serviceWorker from './serviceWorker';

import 'nprogress/nprogress.css';

ReactDOM.render(
  <AuthProvider>
    <SidebarProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </SidebarProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
