/* eslint-disable react/no-unescaped-entities */
/**
 *
 * Signup
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
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signupRequeust } from './actions';
export function Signup(props) {
  useInjectReducer({ key: 'signup', reducer });
  useInjectSaga({ key: 'signup', saga });

  const [signupForm, setSignupForm] = useState({
    userError: null,
    passError: null,
    username: '',
    password: '',
  });

  const onChange = e => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const makeSignup = evt => {
    evt.preventDefault();

    if (signupForm.password === '' && signupForm.username === '') {
      setSignupForm({
        ...signupForm,
        userError: 'Username is required',
        passError: 'Password is required',
      });
    } else if (signupForm.username === '') {
      setSignupForm({
        ...signupForm,
        passError: null,
        userError: 'Username is required',
      });
    } else if (signupForm.password === '') {
      setSignupForm({
        ...signupForm,
        userError: null,
        passError: 'Password is required',
      });
    } else {
      const user = {
        username: signupForm.username,
        password: signupForm.password,
      };
      props.submitForm(user);
    }
  };

  const { signup } = props;

  return (
    <div>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="Description of Signup" />
      </Helmet>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="4" md="6" sm="6" xs="12">
            <Card>
              <Card.Header>Signup</Card.Header>
              <Card.Body>
                {signup.error ? (
                  <Alert variant="danger">{signup.error}</Alert>
                ) : null}
                <Form onSubmit={evt => makeSignup(evt)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      value={signupForm.username}
                      placeholder="Enter email"
                      onChange={onChange}
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
                      value={signupForm.password}
                      placeholder="Password"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  {signupForm.userError || signupForm.passError ? (
                    <Alert variant="danger">
                      {signupForm.userError}
                      <br />
                      {signupForm.passError}
                    </Alert>
                  ) : null}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={signup.loading}
                  >
                    {signup.loading ? (
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

Signup.propTypes = {
  // dispatch: PropTypes.func,
  submitForm: PropTypes.func,
  signup: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: user => dispatch(signupRequeust(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Signup);
