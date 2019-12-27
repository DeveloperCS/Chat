import React from 'react';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';

interface Props {
    onChange: (event: React.FormEvent<FormControlProps>) => void
}

const SearchInput: React.FunctionComponent<Props> = (props) => {
    return(
        <div className='form-group'>
            <div className='input-icon mb-3'>
                <FormControl onChange={props.onChange} type='text' placeholder='Buscar'/>
                <span className='input-icon-addon'>
                    <i className='fe fe-search' />
                </span>
            </div>
        </div>
    )
}

export default React.memo(SearchInput);
