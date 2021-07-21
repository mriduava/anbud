import React, {useContext} from 'react'
import { UserContext } from '../../contexts/UserContextProvider'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  
  return (
    <Route {...rest} render={
      props => {
        if (user) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/user-login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute