import React, {createContext, useState, useEffect} from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    let res = await fetch('/auth/user')
    try {
      res = await res.json()
      setUser(res)
      localStorage.setItem('user', JSON.stringify(user)) 
    } catch {
      console.log("Not authenticated!");
    }
  }

  useEffect(()=>{
    fetchUser()
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      setUser(currentUser)
    }
  },[])

  const values = {
    user,
    setUser,
    fetchUser
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
