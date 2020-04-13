import React, { Component } from 'react'
import { connect } from 'react-redux';
import StatusMessage from 'components/alert/StatusMessage';
import { showStatusMsg, hideStatusMsg } from 'actions/alert.action';
import { pushHistory } from 'actions/global.action';
import { extractQueryInfoByKey } from 'utils/alert.util';

class LoginStatusMessage extends Component {
    
    DEFAULT_ERROR = { key: 'error', status: 'error', header: 'Error Occured' }
    EMAIL_CONFIRM_SUCCESS = { key: 'email_confirmed', status: 'success', header: 'Email Confirmed'};
    EMAIL_CONFIRM_WARNING = { key: 'email_confirmed_ad', status: 'warning', header: 'Email Already Confirmed'};
    STATUS_OPTIONS = [
        this.EMAIL_CONFIRM_SUCCESS,
        this.EMAIL_CONFIRM_WARNING,
        this.DEFAULT_ERROR,
    ]

    componentDidMount(){
        console.log(this.props)
        const { status, header } = extractQueryInfoByKey(this.STATUS_OPTIONS);
        if(status){
            this.props.pushHistory('/login')
            this.props.showStatusMsg({  
                status: status, 
                msg: { header }
            })
        }
    }

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
})(LoginStatusMessage);
