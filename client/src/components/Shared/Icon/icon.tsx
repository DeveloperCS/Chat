import React from 'react';

interface Props {
    src: any,
    width: any, 
    height: any,
    cursor:any
}

export const IconCustom: React.FunctionComponent<any> = (props) => {


    const { src, width, height,cursor,onCliked} = props;

    return (
     <img src={`./src/static/icons/${src}`} onClick={onCliked} style={{width:width,height:height,cursor:cursor}}/>
    );

}