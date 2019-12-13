/* eslint-disable react/no-unescaped-entities */
/**
 *
 * Login
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginRequeust } from './actions';

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const [loginForm, setLoginForm] = useState({
    userError: null,
    passError: null,
    username: '',
    password: '',
  });

  const onChangee = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const makeLogin = evt => {
    evt.preventDefault();
    if (loginForm.password === '' && loginForm.username === '') {
      setLoginForm({
        ...loginForm,
        userError: 'Username is required',
        passError: 'Password is required',
      });
    } else if (loginForm.username === '') {
      setLoginForm({
        ...loginForm,
        passError: null,
        userError: 'Username is required',
      });
    } else if (loginForm.password === '') {
      setLoginForm({
        ...loginForm,
        userError: null,
        passError: 'Password is required',
      });
    } else {
      console.log('on submit', loginForm.username, loginForm.password);

      const user = {
        username: loginForm.username,
        password: loginForm.password,
      };
      props.submitForm(user);
    }
  };

  const { login } = props;

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="4" md="6" sm="6" xs="12">
            <Card>
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={evt => makeLogin(evt)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      value={loginForm.username}
                      placeholder="Enter email"
                      onChange={onChangee}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={loginForm.password}
                      placeholder="Password"
                      onChange={onChangee}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  {loginForm.userError || loginForm.passError ? (
                    <Alert variant="danger">
                      {loginForm.userError}
                      <br />
                      {loginForm.passError}
                    </Alert>
                  ) : null}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={login.loading}
                  >
                    {login.loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                        {'  '}
                        Loading...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Login.propTypes = {
  submitForm: PropTypes.func,
  login: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: user => dispatch(loginRequeust(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
