import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const refreshUserData = ()=>{
  if (localStorage.getItem("auth")) {
    const user_id = localStorage.getItem("auth")
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${user_id}`)
      .then((response) => {
        setUserId(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  } else {
    setUserId(null)
  }
}
useEffect(()=>{
  refreshUserData()
},[])
  return (
    <UserContext.Provider value={{ userId, setUserId ,refreshUserData}}>
      {children}
    </UserContext.Provider>
  );
};

