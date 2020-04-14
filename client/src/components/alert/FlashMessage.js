import React from 'react'
import { Message } from 'semantic-ui-react'

const StatusMessage = ({ show, status, header, content }) => {
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

export default StatusMessage
