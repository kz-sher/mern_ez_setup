import React from 'react'
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react'

const styles = {
    message: {
        textAlign: 'center'
    }
}
const FlashMessage = ({ show, status, header, content, style }) => {
    return (
        <>
            {show && 
            <Message
                error={status==='error'}
                success={status==='success'}
                warning={status==='warning'}
                header={header} 
                content={content}
                style={styles.message}
            />}
        </>
    )
}

FlashMessage.propTypes = {
    show: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    header: PropTypes.string,
    content: PropTypes.string,
    style: PropTypes.object,
};



export default FlashMessage
