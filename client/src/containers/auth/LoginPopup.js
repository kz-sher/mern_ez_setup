import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import LoginForm from 'components/auth/LoginForm';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { login } from 'actions/auth.action';

const LoginPopup = ({
    errors,
    loginPopupOpen,
    isSubmitting,
    handleSubmit,
}) =>{

    return (
        <Modal open={loginPopupOpen} dimmer='blurring' size='tiny' closeOnEscape={false} closeOnDimmerClick={false} >
            <Modal.Header>Session Expired</Modal.Header>
            <Modal.Content>
                <Grid.Column>
                    <p>Please enter your credentials for session renewal</p>
                    <GeneralFlashMessage event='LOGIN' />
                    <LoginForm errors={errors} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
                </Grid.Column>
            </Modal.Content>
        </Modal>
    );
}

const initialValues = {
    email: '',
    password: '',
}

const LoginPopupFormik = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    handleSubmit: (values, { props, setErrors, setSubmitting }) => {
        const { login } = props;
        login({ userData: values, fromPopup: true, setErrors, setSubmitting });
    }
});

const mapStateToProps = state => ({
    loginPopupOpen: state.view.loginPopupOpen,
});

LoginPopup.propTypes = {
    errors: PropTypes.object.isRequired,
    loginPopupOpen: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, { login }),
    LoginPopupFormik
)(LoginPopup);