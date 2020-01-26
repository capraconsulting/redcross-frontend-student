import React from 'react';
import ReactDOM from 'react-dom';
import { initSentry } from '@capraconsulting/sentry-utils-js';

import StudentApp from './App';
import ErrorBoundary from './ui/components/ErrorBoundary';

initSentry({
  release: '1',
  buildTimestamp: 'unknown',
  isProd: false,
  sentryDsn: process.env.SENTRY_DSN || 'missing DSN',
});

ReactDOM.render(
  <ErrorBoundary>
    <StudentApp />
  </ErrorBoundary>,
  document.getElementById('root'),
);
