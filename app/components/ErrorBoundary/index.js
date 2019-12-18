/**
 *
 * ErrorBoundary
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (this.state.error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            <pre>
              {error && error.toString()}
              <hr />
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
