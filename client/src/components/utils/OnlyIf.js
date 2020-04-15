import PropTypes from 'prop-types';

const OnlyIf = (props) => {
    const condition = props.condition || false;
    
    return condition? props.children: null;
};


OnlyIf.propTypes = {
    props: PropTypes.shape({
        condition: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
    })
}

export default OnlyIf;