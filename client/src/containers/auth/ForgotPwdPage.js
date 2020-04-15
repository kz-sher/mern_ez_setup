import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import { withFormik } from 'formik';
import ForgotPwdForm from 'components/auth/ForgotPwdForm';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { forgotPwd } from 'actions/auth.action';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}

const ForgotPwdPage = ({
    errors,
    isSubmitting,
    handleSubmit,
}) =>{
    return (
        <Grid container style={styles.root}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Forgot password
                </Header>
                <GeneralFlashMessage event='FORGOTPWD' />
                <ForgotPwdForm errors={errors} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
            </Grid.Column>
        </Grid>
    );
}

const initialValues = {
    email: '',
}

const ForgotPwdFormik = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    handleSubmit: (values, { props, setErrors, setSubmitting, resetForm}) => {
        const { forgotPwd } = props;
        forgotPwd({ userData: values, setErrors, setSubmitting, resetForm});
    }
});

ForgotPwdPage.propTypes = {
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default compose(
    connect(null, { forgotPwd }),
    ForgotPwdFormik
)(ForgotPwdPage);