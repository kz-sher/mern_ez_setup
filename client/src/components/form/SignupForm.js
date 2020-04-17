import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { useFormikContext } from 'formik';
import COUNTRIES_OPTIONS from 'data/countries.json';
import GENDER_OPTIONS from 'data/genders.json';
import TextField from 'components/input/TextField';
import SelectField from 'components/input/SelectField';
import PasswordField from 'components/input/PasswordField';

const SignupForm = () => {
    const { isSubmitting, handleSubmit} = useFormikContext();
    return (
        <Form loading={!!isSubmitting} onSubmit={handleSubmit}>
            <Segment textAlign='left'>
                <TextField name='email'/>
                <TextField name='username'/>
                <TextField name='firstname'/>
                <TextField name='lastname'/>
                <SelectField name='gender' opt={GENDER_OPTIONS} />
                <SelectField name='country' opt={COUNTRIES_OPTIONS} />
                <PasswordField name='password'/>
                <PasswordField name='password_confirmation'/>
                <Form.Button type='submit' color='blue' size='large' fluid>Submit</Form.Button>
            </Segment>
        </Form>
    )
}

export default SignupForm;
