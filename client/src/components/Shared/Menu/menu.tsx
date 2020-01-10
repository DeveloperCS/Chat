import React from 'react';
import SignOutButton from '../../Buttons/SignOutButton';
//import '../../../style/Menu';

interface Props {
    type: any,
    header: string,
    isOpened:any,
    onHandlerOpened:any
}
export const MenuSider: React.FunctionComponent<Props> = (props) => {

    const { header,isOpened,onHandlerOpened} = props

    return (
        <div className={isOpened?`content`:`d-none`}>
            <div className={`row text-center m-0 p-0 h-100`}>
                <div className={`col-12 headerMenu `}>
                    <div className={`iconCloseContainer`}><i className="fas fa-times" onClick={onHandlerOpened}></i></div>
                    <h3 className={`titleHeaderMenu`}>{header}</h3>
                </div>
                <div className={`col-12`}>

                </div>
                <div className={`col-12 align-self-end footerMenu`}>
                    <SignOutButton className="signout" title='Cerrar sesión' />
                </div>
            </div>
        </div>
    );
}