import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Container} from "@material-ui/core";
import {getFetchOptions} from "./utils/fetchUtils";
import PositionsRoutes from "./components/Positions/PositionsRoutes";
import EmployeesRoutes from "./components/Employees/EmployeesRoutes";
import LandingPage from "./components/Landing/LandingPage";
import ProfileRoutes from "./components/Profile/ProfileRoutes";
import Authentication from "./components/Authentication/Authentication";
import UserContext from "./context/user-context";
import Navigation from "./components/Navigation/Navigation";
import './App.css';
import withErrorModal from "./hoc/withErrorModal";

const App = props => {
   const token = localStorage.getItem("token"),
         [userState, setUserState] = useState({
            id: null,
            name: null,
            isCompany: null
         });

   const setUser = userData => {
      const currentToken = localStorage.getItem("token"),
            {id, name, isCompany, token} = userData;

      // In case the function was called from the verifytoken callback, there is no need to replace the token
      if(!currentToken) localStorage.setItem("token", token);
      setUserState({
         id,
         name,
         isCompany 
      })
   };
   
   const logoutUser = () => {
      localStorage.removeItem("token");
      setUserState({
         id: null,
         name: null,
         isCompany: null
      })
   };

   useEffect(() => {
      const hookToken = localStorage.getItem("token");
      
      if(hookToken){
         const fetchOptions = getFetchOptions("GET", hookToken);

         fetch("/api/auth/verifyToken", fetchOptions)
            .then(response => response.json())
            .then(({error, user}) => {
               if(error) throw new Error(error.message);
               setUser(user);
            })
            .catch(error => {
               logoutUser();
               props.openModalHandler(error.message)
            })
      }
   }, [props]);

   return (
      <Container maxWidth="md" className="App" fixed>
         <BrowserRouter>
            <UserContext.Provider 
               value={{
                  id: userState.id,
                  name: userState.name,
                  isCompany: userState.isCompany,
                  setUser,
                  logoutUser
               }}
            >
               <Navigation />
               <Switch>
                  {!userState.id && !token && <Route path="/authentication" component={Authentication} />}
                  {userState.isCompany && <Route path="/my-employees" component={EmployeesRoutes} />}
                  {userState.id && <Route path="/my-profile" component={ProfileRoutes} />}
                  <Route path="/positions" component={PositionsRoutes} />
                  <Route exact path="/" component={LandingPage} />
                  <Redirect from="/authentication" to="/positions" />
               </Switch>
            </UserContext.Provider>
         </BrowserRouter>
      </Container>
   );
}

export default withErrorModal(App);
