import { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
    background-color: #404040;
    border: none;
    color: #E6E6E6;
    outline: none;
    border-radius: 4px;
    margin: 10px 10px 3px 0;
    padding: 2.6px 6px;
    font-size: 15px;
`

export const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    
    return (
        <>
            <Input
                placeholder='Search'  
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </>
    )
}