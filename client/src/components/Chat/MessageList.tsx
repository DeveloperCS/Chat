import React, { useMemo } from 'react';
import postMessage from '../../redux/thunkActionCreators/Messages/PostMessage';
import { BaseMessage, SenderType } from '../../models/Message';//server
import { ThunkDispatch } from 'redux-thunk';
import { CreateError } from '../../redux/actionCreators/error';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { AppState } from '../../redux/reducers';
import { List } from 'immutable';
import { Message } from '../../redux/reducers/messages';
import MessageInput from './MessageInput';
import MessageComponent from './MessageComponent';
import MessageButtonOptions from './MessageButtonOptions';
import { IconCustom } from '../Shared/Icon';
import '../../style/MessageList';
import { buttons } from '../Constant/ButtionsOptions';

interface Props {
    postMessage: (sessionId: string, message: BaseMessage) => Promise<void>
    userId: string
    messages: List<Message>
}

interface State {
    loading: boolean,
    limit: any,
    init: boolean,
    optionsButtons: Array<any>,
    msgCount: number
}

let cont = 0;
class MessageList extends React.Component<Props, State> {

    readonly state: State = {
        loading: false,
        limit: null,
        init: true,
        optionsButtons: [],
        msgCount: 0
    };


    constructor(props: Props) {
        super(props);

        this.initMessage = this.initMessage.bind(this);
        this.getOptionsButtons = this.getOptionsButtons.bind(this);

    }

    componentDidMount() {
        this.initMessage('${init}');

    }


    initMessage(text: string) {
        let message: BaseMessage = {
            userId: this.props.userId,
            sender: SenderType.user,
            text: text,
            date: new Date(),
            fields: {
                inputOption: { stringValue: "" },
                valuesOptions: { stringValue: "" },
                continueBot: { stringValue: "" }
            },
            action: ''
        }
        this.props.postMessage(this.props.userId, message).then(() => {

            this.setState({
                init: false
            })

        })
    }


    getOptionsButtons(fieldName: any, count: any) {
        this.setState({
            msgCount: count,
            optionsButtons: buttons[fieldName]['fields']
        });
    }

    render() {
        const msgs: any = this.props.messages;
        let hasOptions = false;
        let responseBot = false;




        if (msgs.length != 0) {
            const lastMsg: any = msgs[msgs.length - 1];
            if (lastMsg.action != 'input.unknown') {
                const fieldName = lastMsg.fields['valuesOptions']['stringValue'];
                hasOptions = lastMsg.fields['inputOption']['stringValue'] == 'true';
                responseBot = lastMsg.fields['continueBot']['stringValue'] == 'true';

                if (msgs.length != this.state.msgCount) {
                    if ((lastMsg.sender == 'bot')) {

                        if (!responseBot && hasOptions) {
                            //console.log('falseBot',lastMsg.text);
                            this.getOptionsButtons(fieldName, msgs.length);
                        } else {
                            if (responseBot) {
                                this.initMessage(lastMsg.action);
                            }
                        }
                    }

                }
            }
        }




        return (
            <div>
                <Container>
                    <Container className="message-list">
                        {
                            msgs.map((message: any, index: any) => {
                                return (
                                    (message.text.indexOf('${init}') >= 0 || message.text.indexOf('.Bienvenida-') >= 0) ? null :
                                        <div key={index} className={`content_${message.sender} pt-3`}>

                                            <div className={`${message.sender == 'bot' ? 'd-flex' : ''} content_${message.sender}`}>
                                                {
                                                    message.sender == 'bot' &&
                                                    <IconCustom cursor={'auto'} src={'bot.svg'} width={'20px'} height={'20px'} />

                                                }
                                                <p className={`${message.sender == 'bot' ? 'pl-2' : ''}`}>{message.sender == 'bot' ? 'Bot' : 'Tu'}</p>
                                            </div>
                                            <MessageComponent id={index} sender={message.sender} text={message.text} />
                                        </div>
                                );
                            })
                        }
                    </Container>
                </Container>
                {(hasOptions && !responseBot) &&
                    <MessageButtonOptions userId={this.props.userId} butons={this.state.optionsButtons} />
                }
                <MessageInput className='d-flex' disable={hasOptions} userId={this.props.userId} />
            </div>

        );
    }

}

const mapStateToProps = (state: AppState) => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        postMessage: async (sessionId: string, message: BaseMessage) => {
            await dispatch(postMessage(sessionId, message));
        }, createError: (error: Error) => {
            dispatch(CreateError(error));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
