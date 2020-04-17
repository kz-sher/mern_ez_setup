import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { ErrorMessage, useFormikContext } from 'formik';
import Select from 'react-select';
import { labelize } from '../../utils/form.util';

const styles={
    error: {
        color: 'red',
        fontSize: '10px',
        marginTop: '-1em',
        marginBottom: '1em'
    }
}

const SelectField = ({ name, opt }) => {
    
    const { values, setFieldValue } = useFormikContext();
    const initVal = { label: values[name], value: values[name] }
    const handleChange = selected => setFieldValue(name, selected.value);

    return (<>
            <Form.Field> 
                <label>{labelize(name)}</label>
                <Select
                    name={name} 
                    onChange={handleChange}
                    value={initVal}
                    options={opt}
                />
            </Form.Field>
            <ErrorMessage name={name} component='div' style={styles.error} />
            </>)
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    opt: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectField;