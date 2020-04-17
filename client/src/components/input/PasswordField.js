import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Field, ErrorMessage} from 'formik';
import { labelize } from '../../utils/form.util';

const styles={
    error: {
        color: 'red',
        fontSize: '10px',
        marginTop: '-1em',
        marginBottom: '1em'
    }
}

const PasswordField = ({ name }) => {
    const [pwdVisibility, setPwdVisibility] = useState(false)
    const handlePwdVisibility = (e) => { 
        setPwdVisibility(!pwdVisibility) 
    };

    return (<>
            <Field
                as={Form.Input} 
                fluid
                label={labelize(name)}
                name={name}
                type={pwdVisibility? 'text': 'password'}
                action={{
                    icon: pwdVisibility? 'eye slash': 'eye',
                    onClick: handlePwdVisibility,
                    tabIndex: '-1',
                    as: 'div'
                }}
            />
            <ErrorMessage name={name} component='div' style={styles.error} />
            </>)
}

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
};

export default PasswordField;