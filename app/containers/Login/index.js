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
import { makeSelectUser } from '../App/selectors';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginRequeust } from './actions';

export function Login(props) {
  // if (props.user) {
  //   props.history.push('/');
  // }

  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const [loginData, setStateLoginData] = useState({
    userError: '',
    passError: '',
    username: '',
    password: '',
  });

  const onChange = e => {
    setStateLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const makeLogin = evt => {
    evt.preventDefault();

    if (loginData.username === '' && loginData.password === '') {
      setStateLoginData({
        ...loginData,
        userError: 'Username is required',
        passError: 'Password is required',
      });
    } else if (loginData.username === '') {
      setStateLoginData({
        ...loginData,
        passError: '',
        userError: 'Username is required',
      });
    } else if (loginData.password === '') {
      setStateLoginData({
        ...loginData,
        userError: '',
        passError: 'Password is required',
      });
    } else {
      props.submitForm({
        username: loginData.username,
        password: loginData.password,
      });
      setStateLoginData({
        ...loginData,
        userError: '',
        passError: '',
      });
    }
  };

  const { login } = props;
  // changing login form value with signup form
  // if (signup.user) {
  //   const { username, password } = signup.user;
  //   if (username !== loginData.username && password !== loginData.password) {
  //     console.log(username, password);
  //     setStateLoginData({
  //       ...loginData,
  //       username,
  //       password,
  //     });
  //   }
  // }
  if (loginData.username === 'error') {
    // Simulate a JS error
    throw new Error('I crashed!');
  }
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
                {login.error ? (
                  <Alert variant="danger">{login.error}</Alert>
                ) : null}
                {/* {signup.user ? (
                  <Alert variant="primary">Successfully signed up!</Alert>
                ) : null} */}
                <Form onSubmit={evt => makeLogin(evt)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      value={loginData.username}
                      placeholder="Enter email"
                      onChange={onChange}
                      isInvalid={!loginData.username && loginData.userError}
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
                      value={loginData.password}
                      placeholder="Password"
                      onChange={onChange}
                      isInvalid={!loginData.password && loginData.passError}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  {loginData.userError || loginData.passError ? (
                    <Alert variant="danger">
                      {loginData.userError}
                      <br />
                      {loginData.passError}
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
                          size="sm"
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
  user: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  user: makeSelectUser(),
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
