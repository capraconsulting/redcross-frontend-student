import React from 'react';

// Styles
import './styles/base.less';

//Router
import AppRouter from './Router';
import { SocketProvider } from './providers';

export const App = () => {
  return (
    <SocketProvider>
      <div className="base">
        <AppRouter />
      </div>
    </SocketProvider>
  );
};

export default App;
