import { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect(null, { confirmEmail })(EmailConfirmation);
