import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const CompanyNavItems = () => (
   <Fragment>
      <NavItem url="/my-profile">
         My Profile
      </NavItem>
      <NavItem url="/my-employees">
         My Employees
      </NavItem>
      <NavItem url="/positions" action={() => console.log("logout")}>
         Logout
      </NavItem>
   </Fragment>
);

export default CompanyNavItems;