import PropTypes from 'prop-types';

const If = (props) => {
    const condition = props.condition || false;
    const positive = props.then || null;
    const negative = props.else || null;
    
    return condition ? positive : negative;
};

If.propTypes = {
    condition: PropTypes.bool.isRequired,
    then: PropTypes.node.isRequired,
    else: PropTypes.node.isRequired,
}

export default If;