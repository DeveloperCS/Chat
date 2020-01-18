import React, { FormEvent } from 'react';
import postMessage from '../../redux/thunkActionCreators/Messages/PostMessage';
import { BaseMessage, SenderType } from '../../models/Message';//server
import { ThunkDispatch } from 'redux-thunk';
import { CreateError } from '../../redux/actionCreators/error';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import Form from 'react-bootstrap/Form';
import '../../style/MessageButtonOptions';
import Button from 'react-bootstrap/Button';
import { buttons } from '../Constant/ButtionsOptions';
import { Message } from '../../redux/reducers/messages';
import { List } from 'immutable';


interface Props {
    postMessage: (sessionId: string, message: BaseMessage) => Promise<void>
    userId: string,
    butons: any,
    messages: List<Message>
}

 interface State {
    // optionsButtons: Array<any>
 }

 let cont = 0;
class MessageButtonOptions extends React.Component<Props>{

    readonly state: State = {
        // optionsButtons: []
    };


    constructor(props: Props) {
        super(props);
        this.initMessage = this.initMessage.bind(this);
        // this.getOptionsButtons = this.getOptionsButtons.bind(this);

    }
    componentDidMount() {
        this.props.messages.map((message: any, i: any) => {
            // this.getOptionsButtons(message.sender == 'bot' ? message : null, message.sender == 'bot' ? i : null)
        })   // this.initMessage();

    }

    initMessage(value: any) {
        let message: BaseMessage = {
            userId: this.props.userId,
            sender: SenderType.user,
            text: value,
            date: new Date(),
            fields: {
                inputOption: { stringValue: "false" },
                valuesOptions: { stringValue: "asdas" },
                continueBot:{ stringValue: "" }
            },
            action:''
        }
        this.props.postMessage(this.props.userId, message).then(() => {
            this.setState({
                init: false
            })

        })
    }
    // getOptionsButtons(options: any, index: any) {

    //     if (options != null) {
    //         if (options.fields['inputOption']['stringValue'] == 'true') {
    //             if (cont == 0) {
    //                 this.setState({
    //                     optionsButtons: buttons[`${options['fields']['valuesOptions']['stringValue']}`]['fields']
    //                 })
    //                 console.log('my', buttons[`${options['fields']['valuesOptions']['stringValue']}`]['fields'])
    //             }
    //         } else if(options.fields['inputOption']['stringValue'] == 'false') {
    //             console.log('else',this.state.optionsButtons);
    //             this.setState({ 
    //                 optionsButtons: [] 
    //             })
    //             console.log('else',this.state.optionsButtons);
    //         }
    //         cont = index;
    //     }

    // }




    render() {
        return <div className={`row contentButtons`}>

            {
                this.props.butons.map((values: any, i: any) => {

                    return (
                        <Button className={' buttons col-3 m-1'}  variant='primary' key={i} onClick={() => { this.initMessage(values) }}>
                            {values}
                        </Button>
                    )

                })
            }
        </div>;

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

export default connect(mapStateToProps, mapDispatchToProps)(MessageButtonOptions);

