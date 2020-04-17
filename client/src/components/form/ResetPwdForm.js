import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { useFormikContext } from 'formik';
import PasswordField from 'components/input/PasswordField';

const ResetForm = () => {
    const { isSubmitting, handleSubmit} = useFormikContext();
    return (
        <Form loading={!!isSubmitting} onSubmit={handleSubmit}>
            <Segment textAlign='left'>
                <PasswordField name='password'/>
                <PasswordField name='password_confirmation' />
                <Form.Button type='submit' color='blue' size='large' fluid>Submit</Form.Button>
            </Segment>
        </Form>
    )
}

export default ResetForm;
