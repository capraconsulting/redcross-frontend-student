import React from 'react';

export const SectionHelper = () => {
  return (
    <div className="cross-my-heart--helper" style={{ textAlign: 'left' }}>
      Fant du ikke det du lette etter?{' '}
      <a className="cross-my-heart--link" href="/questions/new">
        Still et spørsmål
      </a>
    </div>
  );
};

export default SectionHelper;
