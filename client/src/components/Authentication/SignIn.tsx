import * as React from 'react';
import { connect } from 'react-redux';
import signIn from '../../redux/thunkActionCreators/Authentication/SignIn';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import SignForm from './SignForm';
import { CreateError } from '../../redux/actionCreators/error';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
    signIn: (email: string, password: string) => Promise<void>,
    createError: (error: Error) => Promise<void>
}

interface State {
    showSpinner: boolean,
    redirect: boolean
}

class SignIn extends React.Component<Props, State> {

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
        this.props.signIn(
            data.get('email').toString(),
            data.get('password').toString()
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
        return this.state.redirect ? <Redirect to='/' /> : (
            <Container className='sign-container container-fluid'>
                <Row className='sign-row'>
                    <Col className="d-sm-none d-lg-block d-xl-block" xs='1' sm='1' lg='3' />
                    <Col xs='12' sm='12' lg='6'>
                        <SignForm
                            title='Iniciar Sesión'
                            showSpinner={this.state.showSpinner}
                            loadingButtonTitle='Iniciar Sesión'
                            alternativeButtonTitle='Crear Cuenta'
                            subTitle='Hola a todos! Bienvenidos a WizCoach'
                            buttonsType={['btnAcction', 'btnSecond']}
                            redirectURL='/signup'
                            recoverPass={true}
                            onSubmit={this.handleSubmit}>
                            <Form.Group className={'pb-3'}>
                                {/* <Form.Label>Email</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='email' name='email' placeholder="Correo" required></Form.Control>
                            </Form.Group>
                            <Form.Group className={''}>
                                {/* <Form.Label>Contraseña</Form.Label> */}
                                <Form.Control className={'border-top-0  border-right-0 border-left-0 border-bottom-2 border-gray'} type='password' name='password' placeholder="Contraseña" pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$' required></Form.Control>
                            </Form.Group>
                        </SignForm>
                    </Col>
                    <Col className="d-sm-none d-lg-block d-xl-block" xs='1' sm='1' lg='3' />
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        signIn: async (email: string, password: string) => {
            await dispatch(signIn(email, password));
        }, createError: (error: Error) => {
            dispatch(CreateError(error));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignIn);
