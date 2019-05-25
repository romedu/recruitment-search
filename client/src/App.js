import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {getFetchOptions} from "./utils/fetchUtils";
import PositionsRoutes from "./components/Positions/PositionsRoutes";
import './App.css';

const App = () => {
   const [userState, setUserState] = useState({
      id: null,
      name: null,
      isCompany: null
   });

   useEffect(() => {
      const token = localStorage.getItem("token");
      if(token){
         const fetchOptions = getFetchOptions("GET", token);

         fetch("/api/auth/verifyToken", fetchOptions)
            .then(response => response.json())
            .then(({error, user}) => {
               if(error) throw new Error(error.message);
               const {id, name, isCompany} = user;
               setUserState({
                  id,
                  name,
                  isCompany 
               })
            })
            .catch(error => {
               console.log("Create modal: ", error.message);
            })
      }
   }, []);

   return (
      <BrowserRouter>
         <Route path="/positions" component={PositionsRoutes} />
      </BrowserRouter>
   );
}

export default App;
