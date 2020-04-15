import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { withFormik } from 'formik';
import LoginForm from 'components/auth/LoginForm';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { login } from 'actions/auth.action';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}

const LoginPage = ({
    errors,
    isSubmitting,
    handleSubmit,
}) =>{
    return (
        <Grid container style={styles.root}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Log-in to your account
                </Header>
                <GeneralFlashMessage event='LOGIN' />
                <LoginForm errors={errors} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
                <Message>
                    New to us? &nbsp; <Link to='signup'>Sign Up</Link>
                </Message>
                <p><Link to='forgotpwd'>Forgot Password</Link></p>
            </Grid.Column>
        </Grid>
    );
}

const initialValues = {
    email: '',
    password: '',
}

const LoginFormik = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    handleSubmit: (values, { props, setErrors, setSubmitting }) => {
        const { login } = props;
        login({ userData: values, setErrors, setSubmitting });
    }
});

LoginPage.propTypes = {
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default compose(
    connect(null, { login }),
    LoginFormik
)(LoginPage);