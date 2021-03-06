import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Field, ErrorMessage } from 'formik';
import { labelize } from '../../utils/form.util';

const styles={
    error: {
        color: 'red',
        fontSize: '10px',
        marginTop: '-1em',
        marginBottom: '1em'
    }
}

const TextField = ({ name }) => {
    return (<>
            <Field
                as={Form.Input} 
                fluid
                label={labelize(name)}
                name={name}
            />
            <ErrorMessage name={name} component='div' style={styles.error} />
            </>)
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
};

export default TextField;