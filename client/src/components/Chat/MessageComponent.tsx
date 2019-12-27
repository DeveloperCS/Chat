import React from 'react';
import { Message } from '../../redux/reducers/messages';
import '../../style/Message'

interface Props {
    message: Message,
    id:any
}

const MessageComponent: React.FunctionComponent<Props> = (props) => {
    return(
         <div id={props.id} className="message">
             <p>{ props.message.text }</p>
        </div>
    );
}

export default MessageComponent;
