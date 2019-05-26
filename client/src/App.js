import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {getFetchOptions} from "./utils/fetchUtils";
import PositionsRoutes from "./components/Positions/PositionsRoutes";
import LandingPage from "./components/Landing/LandingPage";
import UserContext from "./context/user-context";
import './App.css';

const App = () => {
   const [userState, setUserState] = useState({
      id: null,
      name: null,
      isCompany: null
   });

   const setUser = userData => {
      const {id, name, isCompany} = userData;
      setUserState({
         id,
         name,
         isCompany 
      })
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      if(token){
         const fetchOptions = getFetchOptions("GET", token);

         fetch("/api/auth/verifyToken", fetchOptions)
            .then(response => response.json())
            .then(({error, user}) => {
               if(error) throw new Error(error.message);
               setUser(user);
            })
            .catch(error => {
               console.log("Create modal: ", error.message);
            })
      }
   }, []);

   return (
      <BrowserRouter>
         <UserContext.Provider 
            value={{
               id: userState.id,
               name: userState.name,
               isCompany: userState.isCompany,
               setUser
            }}
         >
            <Route path="/positions" component={PositionsRoutes} />
            <Route exact path="/" component={LandingPage} />
         </UserContext.Provider>
      </BrowserRouter>
   );
}

export default App;
