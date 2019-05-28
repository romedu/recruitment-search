import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const AuthNavItems = () => (
   <Fragment>
      <NavItem url="/authentication/login">
         Login
      </NavItem>
      <NavItem url="/authentication/register">
         Register
      </NavItem>
   </Fragment>
);

export default AuthNavItems;