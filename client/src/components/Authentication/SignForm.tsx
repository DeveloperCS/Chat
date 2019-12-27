import * as React from 'react';
import LoadingButton from '../Buttons/LoadingButton';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../../style/SignForm';

interface Props {
    loadingButtonTitle: string,
    alternativeButtonTitle: string,
    showSpinner: boolean,
    redirectURL: string,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    title: string
}

interface State {
    redirect: boolean
}

export default class SignForm extends React.Component<Props, State> {

    state: Readonly<State> = {
        redirect: false
    };

    render() {
        return this.state.redirect ? <Redirect to='/'/> : (
            <Form
                onSubmit={this.props.onSubmit}>
                <Form.Row>
                    <Card className='w-100'>
                        <Card.Header>
                            <h3>{ this.props.title }</h3>
                        </Card.Header>
                        <Card.Body>
                            {this.props.children}
                        </Card.Body>
                        <Card.Footer>
                            <LoadingButton
                                block
                                variant='success'
                                spinnerVariant='light'
                                disabled={this.props.showSpinner}
                                loading={this.props.showSpinner}
                                title={this.props.loadingButtonTitle}/>
                            <LinkContainer to={this.props.redirectURL}>
                                <Button block>{this.props.alternativeButtonTitle}</Button>
                            </LinkContainer>
                        </Card.Footer>
                    </Card>
                </Form.Row>
            </Form>
        );
    }
}
