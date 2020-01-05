import React from 'react';

// Styles
import './styles/base.less';

//Router
import AppRouter from './Router';
import { SocketProvider } from './providers';
import OpeningHoursProvider from './providers/OpeningHoursProvider';

export const App = () => {
  return (
    <SocketProvider>
      <OpeningHoursProvider>
        <div className="base">
          <AppRouter />
        </div>
      </OpeningHoursProvider>
    </SocketProvider>
  );
};

export default App;
