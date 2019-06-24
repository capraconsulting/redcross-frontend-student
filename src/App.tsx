import React, { useState, useEffect } from 'react';

// Styles
import './styles/base.less';

// Global components
import { Header, Footer } from './ui/components';
import AppRouter from './Router';

export const App = () => {
  //Constructing state
  const [time, setTime] = useState(new Date());
  const [isOpen] = useState(false);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 10 * 1000);
  }, []);

  return (
    <div>
      <div className="base">
        {Header({ time, isOpen })}
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};

export default App;
