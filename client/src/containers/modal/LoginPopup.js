import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Modal, Message } from 'semantic-ui-react';
import { withFormik } from 'formik';
import LoginForm from 'components/form/LoginForm';
import GeneralFlashMessage from 'containers/alert/GeneralFlashMessage';
import { login, signOut } from 'actions/auth.action';

const styles = {
    message: {
        textAlign: 'center'
    }
}

const LoginPopup = ({ loginPopupOpen, signOut }) =>{
    return (
        <Modal open={loginPopupOpen} dimmer='blurring' size='tiny' closeOnEscape={false} closeOnDimmerClick={false} >
            <Modal.Header>Session Expired</Modal.Header>
            <Modal.Content>
                <Grid.Column>
                    <p>Please enter your credentials for session renewal</p>
                    <GeneralFlashMessage event='LOGIN' />
                    <LoginForm />
                    <Message style={styles.message}>
                        Want to leave? &nbsp; <a href='#logout' onClick={signOut} >Logout</a>
                    </Message>
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
    loginPopupOpen: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, { login, signOut }),
    LoginPopupFormik
)(LoginPopup);