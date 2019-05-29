import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const CompanyNavItems = logoutHandler => (
   <Fragment>
      <NavItem url="/my-profile">
         My Profile
      </NavItem>
      <NavItem url="/my-employees">
         My Employees
      </NavItem>
      <NavItem url="/positions" action={logoutHandler}>
         Logout
      </NavItem>
   </Fragment>
);

export default CompanyNavItems;