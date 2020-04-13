import React from 'react'
import { Segment, Form } from 'semantic-ui-react'
import TextField from '../form/TextField';
import PasswordField from '../form/PasswordField';

const LoginForm = ({ isSubmitting, handleSubmit}) => {
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
