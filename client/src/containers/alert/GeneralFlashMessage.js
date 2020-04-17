import React, { createRef, Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import FlashMessage from 'components/alert/FlashMessage';
import EventEmitter from 'utils/EventEmitter';
import { scrollToRef } from 'utils/general.util';

class GeneralFlashMessage extends Component {
    
    state = {
        visible: false,
        show: false,
        status: '',
        msg: '',
    }

    constructor(props) {
        super(props)
        this.showMessage = this.showMessage.bind(this);
        this.ref = createRef();
    }    

    showMessage({ status, msg }){
        this.setState(prevState => ({ 
            visible: !prevState.visible,
            show: true, status, msg 
        }));
    }

    componentDidMount(){
        EventEmitter.on(this.props.event, this.showMessage);
    }

    componentDidUpdate(){
        if(this.state.show === true){
            scrollToRef(this.ref);
        }
    }

    componentWillUnmount(){
        EventEmitter.off(this.props.event, this.showMessage);
    }

    render(){
        const { visible, show, status, msg } = this.state;
        const { ref } = this;
        return (
            <Fragment>
                <div ref={ref} style={{ display: 'none' }}></div>
                <FlashMessage
                    visible={visible}
                    show={show}
                    status={status}
                    header={msg.header}
                    content={msg.content} 
                />
            </Fragment>
        )
    }
}

GeneralFlashMessage.propTypes = {
    event: PropTypes.string.isRequired,
};

export default GeneralFlashMessage;
