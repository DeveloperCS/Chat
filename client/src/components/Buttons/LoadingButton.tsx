import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    className?: string,
    onClick?: () => void,
    variant: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark",
    disabled: boolean,
    loading: Boolean,
    spinnerVariant: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark"
    title?: string,
    block?: boolean
}

const LoadingButton: React.FunctionComponent<Props> = (props) => {
    return (
        <Button
            onClick={props.onClick}
            block={props.block}
            className = { props.className }
            variant = { props.variant }
            type = 'submit'
            disabled ={ props.disabled} >
            {
                props.loading ? <Spinner animation = 'grow' variant = { props.spinnerVariant }/> :
                props.title !== undefined ? props.title : props.children
            }
        </Button>
    );
}

export default LoadingButton;