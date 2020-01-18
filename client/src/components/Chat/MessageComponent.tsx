import React from 'react';
import { Message } from '../../redux/reducers/messages';
import '../../style/Message'

interface Props {
    // message: Message,
    id: any,
    sender:any,
    text:any
}
const MessageComponent: React.FunctionComponent<Props> = ({id,sender,text}) => {


    return (
        <div id={id}  className={`message_${sender}`}>
            <div className={'row m-0 p-0'}>
                <div className='col-12 m-0 p-0'>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export default MessageComponent;
