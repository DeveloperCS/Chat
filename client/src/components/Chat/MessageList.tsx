import React from 'react';
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
import '../../style/MessageList'

interface Props {
    postMessage: (sessionId: string, message: BaseMessage) => Promise<void>
    userId: string
    messages: List<Message>
}

interface State {
    loading: boolean,
    limit: any,
    init: boolean
}

class MessageList extends React.Component<Props, State> {

    readonly state: State = {
        loading: false,
        limit: null,
        init: true
    };

    constructor(props: Props) {
        super(props);
        this.setScroll = this.setScroll.bind(this);
        this.initMessage = this.initMessage.bind(this);
    }

    componentDidMount() {
        this.initMessage()
    }

    initMessage() {
        let message: BaseMessage = {
            userId: this.props.userId,
            sender: SenderType.user,
            text: '${init}',
            date: new Date()
        }
        this.props.postMessage(this.props.userId, message).then(() => {
            this.setState({
                init: false
            })

        })
    }

    setScroll(id: any) {
        let element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    render() {

        return (
            <div>

                <Container>
                    <Container className="message-list">

                        {

                            this.props.messages.map((message, index) => {
                                return (
                                    message.text.indexOf('${init}')>=0?null:
                                    <MessageComponent id={index} key={index} message={message} />
                                );
                            })

                        }
                    </Container>
                </Container>
                {/* <MessageInput userId={this.props.userId} /> */}
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
