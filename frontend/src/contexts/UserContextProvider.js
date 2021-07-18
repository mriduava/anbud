import React, {createContext, useState, useEffect} from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      setUser(currentUser)
    }
  },[])

  const values = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
