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
    title: string,
    subTitle: string,
    buttonsType: Array<any>,
    recoverPass:boolean
}

interface State {
    redirect: boolean
}

export default class SignForm extends React.Component<Props, State> {

    state: Readonly<State> = {
        redirect: false
    };

    render() {
        return this.state.redirect ? <Redirect to='/' /> : (
            <Form
                className={'fomularioSignin'}
                onSubmit={this.props.onSubmit}>
                <Form.Row>
                    <Card className='w-100'>
                        <div className={'container'}>
                            <h3 className={'titleLogin'}>{this.props.title}</h3>
                            {this.props.subTitle != '' ? <p className={'subtitleLogin'}>{this.props.subTitle}</p> : null}
                        </div>
                        <Card.Body>
                            {this.props.children}
                            {
                                this.props.recoverPass&&
                                <div className={'container'}>
                                <div className={'row'}>
                                    <div className={'col-lg-7 col-sm-5'}></div>
                                    <div className={'col-lg-5 col-sm-7 text-right'}>
                                        <LinkContainer to='/signin'>
                                            <p className={'recoverPass'}>Recuperar Contraseña</p>
                                        </LinkContainer>
                                    </div>
                                </div>
                            </div>
                            }
                        </Card.Body>
                        
                        <div className={'container containerButtons'}>
                            <div className={'row'}>
                                <div className={'col-lg-6 col-sm-12 col-xl-6'}>
                                    <LoadingButton
                                        className={this.props.buttonsType[0]}
                                        block
                                        variant='success'
                                        spinnerVariant='light'
                                        disabled={this.props.showSpinner}
                                        loading={this.props.showSpinner}
                                        title={this.props.loadingButtonTitle} />
                                </div>
                                <div className={'col-sm-12 d-lg-none d-sm-block pb-3'}></div>
                                <div className={'col-lg-6 col-sm-12 col-xl-6'}>
                                    <LinkContainer to={this.props.redirectURL}>
                                        <Button className={this.props.buttonsType[1]} variant="success" block>{this.props.alternativeButtonTitle}</Button>
                                    </LinkContainer>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Form.Row>
            </Form>
        );
    }
}
