import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Search } from './Search'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1F1E21;
    color: #E6E6E6;
`
const LoginWrapper = styled.div`
    padding-left: 10px;
`
const UserName = styled.span`
    text-transform: uppercase;
    font-weight: bold;
    color: #ae0e0e;
    padding-left: 9px;
`
const Logout = styled.span`
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
`

export const Header: React.FC = () => {
    const {isAuth, owner} = useAppSelector(state => state.authReducer)
    const {logout} = useAppDispatch()

    return (
        <Wrapper>
            {
                isAuth ? 
                    <LoginWrapper>
                        <Logout onClick={logout}>Logout</Logout>
                        <UserName>{owner.username}</UserName>
                    </LoginWrapper> :
                    <span>
                        Login
                    </span>
            }
            <div>

            </div>
            {
                isAuth && <Search />  
            }      
        </Wrapper>
    )
}