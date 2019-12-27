import React from 'react';
import Auth from './Authentication/Auth';
import fetchUser, { UserProps } from './Authentication/fetchUser';
import SignOutButton from './Buttons/SignOutButton';
import MessageList from './Chat/MessageList';
import '../style/Home'
import { IconCustom } from './Shared/Icon';
import MessageInput from './Chat/MessageInput';

interface Props extends UserProps { }

const Home: React.FunctionComponent<Props> = (props) => {
    if (props.user !== null) {
        console.log(props.user.name)
    }
    return (

        <Auth>
            {props.user === null ? null :
                <div>
                    <div className="header">
                        <div className={'container m-0 p-0'}>
                            <div className='row'>
                                {/* <h3>{'Hola ' + props.user.name + ' ' + props.user.lastname}</h3> */}
                                {/* <SignOutButton className="signout" title='Cerrar sesión'/> */}
                                <div className={'col-4'}>
                                    <IconCustom cursor={'pointer'} src={'charlar.svg'} width={'40px'} height={'40px'} />
                                </div>
                                <div className={'col-4'}>
                                    <IconCustom cursor={'pointer'} src={'bot.svg'} width={'40px'} height={'40px'} />
                                </div>
                                <div className={'col-4'}>
                                    <IconCustom cursor={'pointer'} src={'account.svg'} width={'40px'} height={'40px'} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='bodyM'>
                        <MessageList userId={props.user.id} />
                    </div>


                    <MessageInput userId={props.user.id} />
                </div>
            }
        </Auth>

    );
}

export default fetchUser(Home);
