import { Redirect, Route, Switch } from 'react-router'
import styled from './App.module.css'
import { Header } from './components/Header'
import { useAppSelector } from './hooks/useAppSelector'
import { IRoute, Path, privateRoute, publicRoute } from './routes'

export const App: React.FC = () => {
  const {isAuth} = useAppSelector(state => state.authReducer)
  return (
    <div className={styled.wrapper}>
        <Header />
        {
          isAuth ? 
            <AppRoute 
              route={privateRoute}
              path={Path.CALENDAR}
            /> : 
            <AppRoute 
              route={publicRoute}
              path={Path.LOGIN}
            />
        }
    </div>
  )
}

const AppRoute: React.FC<{route: IRoute[], path: string}> = ({route, path}) => {
  return (
    <Switch>
        {
          route.map(r => 
                        <Route 
                          {...r}
                          key={r.path} 
                        />)
        }
      <Redirect to={path} />
    </Switch>
  )
}


