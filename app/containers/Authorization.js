import React from 'react';

const Authorization = allowedRoles => WrappedComponent =>
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      // TODO take use form redux
      this.state = {
        user: {
          name: 'john',
          role: 'ADMIN',
        },
      };
    }

    render() {
      const { role } = this.state.user;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      }
      return <h1>No page for you!</h1>;
    }
  };
export default Authorization;
