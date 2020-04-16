import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmEmail } from 'actions/auth.action';

class EmailConfirmation extends Component {
    
    state = {
        percent: 0
    }

    constructor(props){
        super(props);
        this.props.confirmEmail(this.props.match.params);
    }

    render() {
        return null;
    }
}

EmailConfirmation.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null, { confirmEmail })(EmailConfirmation);
