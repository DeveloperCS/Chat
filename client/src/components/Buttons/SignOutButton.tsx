import * as React from 'react';
import deleteTokens from '../../redux/thunkActionCreators/Authentication/DeleteTokens';
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import Button from 'react-bootstrap/Button';

interface Props {
    className?: string,
    title: string,
    deleteTokens: () => void,
    onClicked: () => void
}

const SignOutButton: React.FunctionComponent<Props> = (props) => {
 
 const logOut =() =>{
    new Promise(props.deleteTokens).then(props.onClicked)
 }

    return (
        <Button
            className={props.className}
            variant='danger'
            type='submit'
            onClick={logOut}>
            {props.title}
        </Button>
    );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        deleteTokens: () => {
            dispatch(deleteTokens());
        }
    };
};

export default connect(null, mapDispatchToProps)(React.memo(SignOutButton));
