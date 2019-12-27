import React from 'react';
import { FormControlProps } from 'react-bootstrap/FormControl';

export interface SearchProps {
    search: string
    onSearch: (event: React.FormEvent<FormControlProps>) => void
}

const searchByName = <P extends SearchProps>(WrappedComponent: React.ComponentType<P>) => {

    interface State {
        search: string
    }

    class SearchByName extends React.Component<SearchProps> {

        state: Readonly<State> = {
            search: undefined
        };
    
        constructor(props: SearchProps) {
            super(props);
            this.onSearch = this.onSearch.bind(this);
        }
    
        onSearch(event: React.FormEvent<FormControlProps>) {
            event.preventDefault();
            const input = event.target as HTMLInputElement;
            this.setState({
                search: input.value
            });
        }
    
        render() {
            return <WrappedComponent
                        {...this.props as P}
                        search={this.state.search}
                        onSearch={this.onSearch} />
        }
    }

    return SearchByName as React.ComponentType
}

export default searchByName;
