import React from 'react';

interface Props {
    src: any,
    width: any, 
    height: any,
    cursor:any
}

export const IconCustom: React.FunctionComponent<Props> = (props) => {


    const { src, width, height,cursor} = props;

    return (
     <img src={`./src/static/icons/${src}`} style={{width:width,height:height,cursor:cursor}}/>
    );

}