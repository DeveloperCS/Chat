import React from 'react';
import { AppState } from '../../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { CreateError } from '../../redux/actionCreators/error';
import { User } from '../../redux/reducers/authentication';
import getUser from '../../redux/thunkActionCreators/Authentication/GetUser';

export interface UserProps {
    user: User
    getUser: () => Promise<void>
    createError: (error: Error) => Promise<void>
}

const fetchUser = <P extends UserProps>(WrappedComponent: React.ComponentType<P>) => {
    class FetchUser extends React.Component<UserProps> {
        componentDidMount() {
            this.props.getUser().catch((error) => {
                this.props.createError(error);
            });
        }
    
        render() {
            return <WrappedComponent
                        {...this.props as P}
                        user={this.props.user}
                        getUser={this.props.getUser}
                        createError={this.props.createError} />
        }
    }
    
    const mapStateToProps = (state: AppState) => ({
        user: state.authentication.user
    });
    
    const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
        return {
            getUser: async () => {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
                await dispatch(getUser(token, refreshToken));
            }, createError: (error: Error) => {
                dispatch(CreateError(error));
            }
        };
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(FetchUser) as React.ComponentType;
}

export default fetchUser;
