import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import { withFormik } from 'formik';
import ResetPwdForm from 'components/form/ResetPwdForm';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { resetPwd } from 'actions/auth.action';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}

const ResetPwdPage = () =>{
    return (
        <Grid container style={styles.root}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Reset your password
                </Header>
                <GeneralFlashMessage event='RESETPWD' />
                <ResetPwdForm />
            </Grid.Column>
        </Grid>
    );
}

const initialValues = {
    password: '',
    password_confirmation: '',
}

const ResetPwdFormik = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    handleSubmit: (values, { props, setErrors, setSubmitting}) => {
        const { resetPwd } = props;
        const params = props.match.params;
        resetPwd({ userData: values, params, setErrors, setSubmitting});
    }
});

export default compose(
    connect(null, { resetPwd }),
    ResetPwdFormik
)(ResetPwdPage);