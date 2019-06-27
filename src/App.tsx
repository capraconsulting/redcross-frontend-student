import React from 'react';

// Styles
import './styles/base.less';

//Router
import AppRouter from './Router';

export const App = () => {
  return (
    <div className="base">
      <AppRouter />
    </div>
  );
};

export default App;
