import React from 'react';

export const SectionHeader = () => {
  return (
    <div>
      <div className="volunteer--header">Still et spørsmål</div>
      <p className="volunteer--text" id="NewQuestion--text">
        Still et spørsmål, eller send oss en oppgave eller tekst som du vil at
        vi skal ta en kikk på. Det er helt anonymt og vi får ikke vite hvem du
        er.{' '}
        <span style={{ fontWeight: 640 }}>
          Det tar vanligvis mellom 2-3 dager å få svar.
        </span>
      </p>
    </div>
  );
};

export default SectionHeader;
