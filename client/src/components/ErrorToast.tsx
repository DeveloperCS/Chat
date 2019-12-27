import React from 'react';
import { connect } from "react-redux";
import { AppState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { CleanError } from '../redux/actionCreators/error';
import Toast from 'react-bootstrap/Toast';
import '../style/ErrorToast'

interface Props {
    error: string,
    cleanError: () => void
}

class ErrorToast extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.removeError = this.removeError.bind(this);
    }

    removeError() {
        this.props.cleanError();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.error !== prevProps.error) {
            this.setState({
                isOpen: true
            });
        }
    }

    render() {
        return (
            <Toast className={'error-toast ' + ((this.props.error === null) ? 'error-toast_hidden' : 'error-toast_visible')} onClose = { this.removeError } show = { !(this.props.error === null) } delay = { 2000 } autohide>
                <Toast.Header>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{ this.props.error }</Toast.Body>
            </Toast>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    error: state.error.message
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        cleanError: () => {
            dispatch(CleanError())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorToast);

