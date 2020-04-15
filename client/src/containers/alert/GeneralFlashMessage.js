import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FlashMessage from 'components/alert/FlashMessage';
import EventEmitter from 'utils/EventEmitter';

class GeneralFlashMessage extends Component {
    
    state = {
        show: false,
        status: '',
        msg: '',
    }

    constructor(props) {
        super(props)
        this.showMessage = this.showMessage.bind(this);
    }    

    showMessage({ status, msg }){
        this.setState({ show: true, status, msg });
    }

    componentDidMount(){
        EventEmitter.on(this.props.event, this.showMessage);
    }

    componentWillUnmount(){
        EventEmitter.off(this.props.event, this.showMessage);
    }

    render(){
        const { show, status, msg } = this.state;
        return (
            <FlashMessage show={show} status={status} header={msg.header} content={msg.content} />
        )
    }
}

GeneralFlashMessage.propTypes = {
    event: PropTypes.string.isRequired,
};

export default GeneralFlashMessage;
