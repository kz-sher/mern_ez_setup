import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { useFormikContext } from 'formik';
import TextField from 'components/input/TextField';
import PasswordField from 'components/input/PasswordField';

const LoginForm = () => {
    const { isSubmitting, handleSubmit} = useFormikContext();
    return (
        <Form loading={!!isSubmitting} onSubmit={handleSubmit}>
            <Segment textAlign='left'>
                <TextField name='email'/>
                <PasswordField name='password'/>
                <Form.Button type='submit' color='blue' size='large' fluid>Submit</Form.Button>
            </Segment>
        </Form>
    )
}

export default LoginForm;
