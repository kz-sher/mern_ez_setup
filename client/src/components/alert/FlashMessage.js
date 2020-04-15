import React from 'react'
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react'

const FlashMessage = ({ show, status, header, content }) => {
    return (
        <>
            {show && 
            <Message
                error={status==='error'}
                success={status==='success'}
                warning={status==='warning'}
                header={header} 
                content={content}
            />}
        </>
    )
}

FlashMessage.propTypes = {
    show: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    header: PropTypes.string,
    content: PropTypes.string,
};



export default FlashMessage
