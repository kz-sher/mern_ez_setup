import React from 'react'
import PropTypes from 'prop-types';
import { Message, Transition } from 'semantic-ui-react'
import OnlyIf from 'components/utils/OnlyIf';

const styles = {
    message: {
        textAlign: 'center'
    }
}

const FlashMessage = ({ visible, show, status, header, content }) => {

    return (
            <OnlyIf condition={show}>
                <Transition animation='shake' duration={200} transitionOnMount={true} visible={visible}>
                    <Message
                        error={status==='error'}
                        success={status==='success'}
                        warning={status==='warning'}
                        header={header} 
                        content={content}
                        style={styles.message}
                    />
                </Transition>
            </OnlyIf>
    )
}

FlashMessage.propTypes = {
    visible: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    header: PropTypes.string,
    content: PropTypes.string,
};



export default FlashMessage
