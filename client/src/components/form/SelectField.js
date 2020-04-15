import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { ErrorMessage} from 'formik';
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

const SelectField = ({ name, handler, opt, val }) => {

    const initVal = { label: val[name], value: val[name] }
    return (<>
            <Form.Field> 
                <label>{labelize(name)}</label>
                <Select
                    name={name} 
                    onChange={handler}
                    value={initVal}
                    options={opt}
                />
            </Form.Field>
            <ErrorMessage name={name} component='div' style={styles.error} />
            </>)
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    opt: PropTypes.arrayOf(PropTypes.object).isRequired,
    val: PropTypes.object.isRequired,
};

export default SelectField;