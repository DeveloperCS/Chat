import React from 'react';
import { Message } from '../../redux/reducers/messages';
import '../../style/Message'

interface Props {
    message: Message,
    id: any
}

const MessageComponent: React.FunctionComponent<Props> = (props) => {

    let fecha = new Date(props.message.date);

    let hora = `${fecha.getHours()} : ${fecha.getMinutes()}`;
    return (
        <div id={props.id} className="message">
            <div className={'row m-0 p-0'}>
                <div className='col-12 m-0 p-0'>
                    <p>{props.message.text}</p>
                </div>
            </div>
        </div>
    );
}

export default MessageComponent;
