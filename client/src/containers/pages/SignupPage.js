import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Message } from 'semantic-ui-react';
import { withFormik } from 'formik';
import SignupForm from 'components/form/SignupForm';
import useScrollToError from 'components/hook/useScrollToError';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { signUp } from 'actions/auth.action';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '1em 0em'
    }
}

const SignupPage = () => {
    useScrollToError();
    return (
        <Grid container style={styles.root}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Sign-up for your account
                </Header>
                <GeneralFlashMessage event='SIGNUP' />
                <SignupForm />
                <Message>
                    Already registered? &nbsp; <Link to='login'>Log in</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

const initialValues = {
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    gender: '',
    country: '',
    password: '',
    password_confirmation: '',
}

const SignupFormik = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    handleSubmit: (values, { props, setErrors, setSubmitting, resetForm}) => {
        const { signUp } = props;
        signUp({ userData: values, setErrors, setSubmitting, resetForm});
    }
});

export default compose(
    connect(null, { signUp }),
    SignupFormik
)(SignupPage);