import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const PersonNavItems = logoutHandler => (
   <Fragment>
      <NavItem url="/my-profile">
         My Profile
      </NavItem>
      <NavItem url="/positions" action={logoutHandler}>
         Logout
      </NavItem>
   </Fragment>
);

export default PersonNavItems;