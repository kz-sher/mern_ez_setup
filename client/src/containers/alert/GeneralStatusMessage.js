import React, { Component } from 'react'
import { connect } from 'react-redux';
import StatusMessage from 'components/alert/StatusMessage';
import { showStatusMsg, hideStatusMsg } from 'actions/alert.action';
import { pushHistory } from 'actions/global.action';

class RegisterStatusMessage extends Component {
    
    componentWillUnmount(){
        this.props.hideStatusMsg();
    }

    render(){
        const { show, status, msg } = this.props;
        return (
            <StatusMessage show={show} status={status} header={msg.header} content={msg.content} />
        )
    }
}

const mapStateToProps = state => ({
    show: state.alert.show,
    msg: state.alert.msg,
    status: state.alert.status,
})

export default connect(mapStateToProps, { 
    showStatusMsg,
    hideStatusMsg,
    pushHistory,
})(RegisterStatusMessage);
