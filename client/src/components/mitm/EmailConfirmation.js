import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmEmail } from 'actions/auth.action';

class EmailConfirmation extends Component {
    
    constructor(props){
        super(props);
        const { uid, token } = this.props.match.params;
        this.props.confirmEmail(uid, token);
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
