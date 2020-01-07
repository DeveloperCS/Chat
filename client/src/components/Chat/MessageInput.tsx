import React, { FormEvent } from 'react';
import postMessage from '../../redux/thunkActionCreators/Messages/PostMessage';
import { BaseMessage, SenderType } from '../../models/Message';//server
import { ThunkDispatch } from 'redux-thunk';
import { CreateError } from '../../redux/actionCreators/error';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import LoadingButton from '../Buttons/LoadingButton';
import Col from 'react-bootstrap/Col';
import { AppState } from '../../redux/reducers';
import '../../style/MessageInput'

interface Props {
    postMessage: (sessionId: string, message: BaseMessage) => Promise<void>
    userId: string
}

interface State {
    loading: boolean
}

class MessageInput extends React.Component<Props, State> {

    readonly state: State = {
        loading: false
    };

    textFieldReference: React.RefObject<any>;

    constructor(props: Props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.textFieldReference = React.createRef()
    }

    sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const field = event.target as HTMLFormElement
        const data = new FormData(field);
        let message: BaseMessage = {
            userId: this.props.userId,
            sender: SenderType.user,
            text: data.get('text') as string,
            date: new Date()
        };
        this.textFieldReference.current.value = ""
        this.props.postMessage(this.props.userId, message).then(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (

            <Form className="input-area" onSubmit={this.sendMessage}>
                <Form.Group className="input">
                    <Form.Control className={'inputMsj'} ref={this.textFieldReference} autoComplete='off' name='text' type="text" placeholder="Escribe aquí tu mensaje" required/>
                </Form.Group>
                <LoadingButton className="button" spinnerVariant='light' variant='success' loading={this.state.loading} disabled={this.state.loading}  >
                    <i className="fas fa-paper-plane"></i>
                </LoadingButton>
            </Form>

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

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
