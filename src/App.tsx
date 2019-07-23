import React from 'react';

// Styles
import './styles/base.less';

//Router
import AppRouter from './Router';
import { QueueProvider, SocketProvider } from './providers';

export const App = () => {
  return (
    <QueueProvider>
      <SocketProvider>
        <div className="base">
          <AppRouter />
        </div>
      </SocketProvider>
    </QueueProvider>
  );
};

export default App;
