import PropTypes from 'prop-types';

const If = (props) => {
    const condition = props.condition || false;
    const positive = props.then || null;
    const negative = props.else || null;
    
    return condition ? positive : negative;
};

If.propTypes = {
    props: PropTypes.shape({
        condition: PropTypes.bool.isRequired,
        then: PropTypes.node.isRequired,
        else: PropTypes.node.isRequired,
    }).isRequired
}

export default If;