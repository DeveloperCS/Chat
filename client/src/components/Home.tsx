import React, { useState } from 'react';
import Auth from './Authentication/Auth';
import fetchUser, { UserProps } from './Authentication/fetchUser';
import SignOutButton from './Buttons/SignOutButton';
import MessageList from './Chat/MessageList';
import '../style/Home'
import { IconCustom } from './Shared/Icon';
import MessageInput from './Chat/MessageInput';

import { MenuSider } from './Shared/Menu'

interface Props extends UserProps { }

const Home: React.FunctionComponent<Props> = (props) => {
    const { user } = props; 

    const [opened, changeOpened] = useState(false);

    if (props.user !== null) {
        //console.log(props.user.name)
        // const userName=
    }
    return (

        <Auth>
            {props.user === null ? null :
                <div>
                    <MenuSider header={`${user.name} ${user.lastname}`} isOpened={opened} onHandlerLogout={()=>{changeOpened(false)}} onHandlerOpened={() =>changeOpened(!opened)} type={''} />
                    <div className="header">
                        <div className={'container-fluid m-0 p-0'}>
                            <div className='row'>
                                <div className={'col-4'}>
                                    <IconCustom cursor={'pointer'} src={'charlar.svg'} width={'40px'} height={'40px'} />
                                </div>
                                <div className={'col-4'}>
                                    <IconCustom cursor={'auto'} src={'bot.svg'} width={'40px'} height={'40px'} />
                                </div>
                                <div className={'col-4'}>
                                    <IconCustom cursor={'pointer'} onCliked={() =>changeOpened(!opened)} src={'account.svg'} width={'40px'} height={'40px'} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='bodyM'>
                        <MessageList userId={props.user.id} />
                    </div>


                    {/* <MessageInput userId={props.user.id} /> */}
                </div>
            }
        </Auth>

    );
}

export default fetchUser(Home);
