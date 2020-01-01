import * as React from 'react';
import { connect } from 'react-redux';
import signUp from '../../redux/thunkActionCreators/Authentication/SignUp';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import SignForm from '../Authentication/SignForm';
import Form from 'react-bootstrap/Form';
import { CreateError } from '../../redux/actionCreators/error';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

interface Props {
    signUp: (email: string, password: string, name: string, lastname: string, key: string) => Promise<void>,
    createError: (error: Error) => Promise<void>
}

interface State {
    showSpinner: boolean,
    redirect: boolean
}

class SignUp extends React.Component<Props, State> {

    state: Readonly<State> = {
        showSpinner: false,
        redirect: false
    };

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            showSpinner: true
        });
        const data = new FormData(event.target as HTMLFormElement);
        this.props.signUp(
            data.get('email').toString(),
            data.get('password').toString(),
            data.get('name').toString(),
            data.get('lastname').toString(),
            data.get('key').toString()
        ).then(() => {
            this.setState({
                redirect: true
            })
        }).catch(error => {
            this.setState({
                showSpinner: false
            });
            this.props.createError(error);
        });
    }

    render() {
        return this.state.redirect ? <Redirect to='/'/> : (
            <Container className='sign-container container-fluid'>
                <Row className='sign-row'>
                    <Col xs='1' sm='1' md='3'/>
                    <Col xs='12' sm='12' md='6'>
                        <SignForm
                            title='Crear Cuenta'
                            showSpinner={this.state.showSpinner}
                            loadingButtonTitle='Crear Cuenta'
                            alternativeButtonTitle='Iniciar Sesión'
                            subTitle=''
                            buttonsType={['btnAcction','btnSecond']}
                            redirectURL='/signin'
                            recoverPass={false}
                            onSubmit={this.handleSubmit}>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Email</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='email' name='email' placeholder="Correo" required></Form.Control>
                            </Form.Group>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Nombre</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='text' name='name' placeholder="Nombre" required></Form.Control>
                            </Form.Group>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Apellido</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='text' name='lastname' placeholder="Apellido" required></Form.Control>
                            </Form.Group>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Contraseña</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='password' name='password' placeholder="Contraseña" pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$' required></Form.Control>
                            </Form.Group>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Admin Key</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='password' name='key' placeholder="Admin Key" required></Form.Control>
                            </Form.Group>
                        </SignForm>
                    </Col>
                    <Col xs='1' sm='1' md='3'/>
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        signUp: async (email: string, password: string, name: string, lastname: string, key: string) => {
            await dispatch(signUp(email, password, name, lastname, key));
        }, createError: (error: Error) => {
            dispatch(CreateError(error));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignUp);
