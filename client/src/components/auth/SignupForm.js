import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Form } from 'semantic-ui-react';
import COUNTRIES_OPTIONS from '../../data/countries.json';
import GENDER_OPTIONS from '../../data/genders.json';
import TextField from '../form/TextField';
import SelectField from '../form/SelectField';
import PasswordField from '../form/PasswordField';

const SignupForm = ({ values, isSubmitting, handleSelectChange, handleSubmit}) => {
    return (
        <Form loading={!!isSubmitting} onSubmit={handleSubmit}>
            <Segment textAlign='left'>
                <TextField name='email'/>
                <TextField name='username'/>
                <TextField name='firstname'/>
                <TextField name='lastname'/>
                <SelectField name='gender' opt={GENDER_OPTIONS} handler={handleSelectChange} val={values}/>
                <SelectField name='country' opt={COUNTRIES_OPTIONS} handler={handleSelectChange} val={values}/>
                <PasswordField name='password'/>
                <PasswordField name='password_confirmation'/>
                <Form.Button type='submit' color='blue' size='large' fluid>Submit</Form.Button>
            </Segment>
        </Form>
    )
}

SignupForm.propTypes = {
    values: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
