import React, { useState, useEffect } from 'react';

// Styles
import './styles/base.less';

// Global components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
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
