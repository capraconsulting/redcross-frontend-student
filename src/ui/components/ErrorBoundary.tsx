import { Component } from 'react';
import { logService } from '@capraconsulting/sentry-utils-js';

class ErrorBoundary extends Component {
  public componentDidCatch(error: Error, errorInfo: any) {
    logService.exception(error, errorInfo);
  }

  public render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
