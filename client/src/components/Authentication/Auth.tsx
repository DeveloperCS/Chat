import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import getAccessToken from '../../redux/thunkActionCreators/Authentication/GetAccessToken';
import getRefreshToken from '../../redux/thunkActionCreators/Authentication/GetRefreshToken';
import deleteTokens from '../../redux/thunkActionCreators/Authentication/DeleteTokens';
import { AppState } from '../../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import fetchUser, { UserProps } from './fetchUser'

interface Props extends UserProps {
    token: string,
    refreshToken: string,
    getAccessToken: () => Promise<void>,
    getRefreshToken: () => Promise<void>,
    deleteTokens: () => void
}

const Auth: React.FunctionComponent<Props> = (props) => {

    const checkTokenForUpdate = async () => {
        const {token} = props;
        if (token !== null) {
            let date = localStorage.getItem('tokenDate');
            if (date !== null) {
                const dayDifference = getDaysDifferenceForToken(date);
                if (dayDifference > 6) {
                    await props.getAccessToken();
                    console.log('dsd')
                }
            }
        }
    }

    const checkRefreshTokenForUpdate = async () => {
        const {refreshToken} = props;
        if (refreshToken !== null) {
            let date = localStorage.getItem('refreshTokenDate');
            if (date !== null) {
                const dayDifference = getDaysDifferenceForToken(date);
                if (dayDifference > 28 && dayDifference < 31) {
                    await props.getRefreshToken();
                } else if (dayDifference > 31) {
                    props.deleteTokens();
                }
            }
        }
    }

    const loadUserIfNeeded = async () => {
        const { user, token, refreshToken } = props;
        if (user === null && token !== null && refreshToken !== null) {
            await props.getUser();
        }
    }

    const getDaysDifferenceForToken = (date: string): number => {
        const dateObject = Date.parse(date);
        const now = moment();
        const momentDate = moment(dateObject);
        return now.diff(momentDate, 'days');
    }
    
    checkRefreshTokenForUpdate()
    .then(() => {
        return checkTokenForUpdate();
    }).then(() => {
        return loadUserIfNeeded();
    });

    if (props.token === null || props.refreshToken === null) {
        return <Redirect to='/signin'/>
    } else {
        if (props.user === null) {
            return <Spinner animation='grow' variant='primary' />
        } else {
            return (
                <div> 
                    {props.children}
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.authentication.user,
    token: state.authentication.token,
    refreshToken: state.authentication.refreshToken
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getAccessToken: async () => {
            await dispatch(getAccessToken());
        },
        getRefreshToken: async () => {
            await dispatch(getRefreshToken());
        },
        deleteTokens: () => {
            dispatch(deleteTokens());
        }
    };
};

const AuthWithUser = fetchUser(Auth) as React.ComponentType<Props>;
export default connect(mapStateToProps, mapDispatchToProps)(AuthWithUser) as any;
