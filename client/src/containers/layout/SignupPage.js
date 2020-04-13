import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Message } from 'semantic-ui-react'
import { withFormik } from 'formik';
import SignupForm from 'components/auth/SignupForm';
import GeneralStatusMessage from 'containers/alert/GeneralStatusMessage';
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

const SignupPage = ({
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
}) => {

    const handleSelectChange = function(selected) { 
        setFieldValue(this.name, selected.value)
    };

    return (
        <Grid container style={styles.root}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Sign-up for your account
                </Header>
                <GeneralStatusMessage />
                <SignupForm
                    values={values}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleSelectChange={handleSelectChange}
                    handleSubmit={handleSubmit}
                />
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