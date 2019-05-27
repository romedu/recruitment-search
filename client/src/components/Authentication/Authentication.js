import React, {Fragment} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";

const Authentication = () => (
   <Fragment>
      <Switch>
         <Route path="/authentication/login" component={Login} />
         <Route path="/authentication/register" component={Register} />
         <Redirect to="/authentication/login" /> 
      </Switch>
   </Fragment>
)

export default Authentication;