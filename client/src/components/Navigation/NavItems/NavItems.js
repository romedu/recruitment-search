import React, {useContext} from "react";
import NavItem from "../NavItem/NavItem";
import AuthNavItems from "../AuthNavItems";
import PersonNavItems from "../PersonNavItems";
import CompanyNavItems from "../CompanyNavItems";
import UserContext from "../../../context/user-context";
import styles from "./NavItems.module.css";

const NavItems = ({inSideDrawer, hideSideDrawer}) => {
   const userContext = useContext(UserContext),
         onLogoutHandler = () => {
            userContext.logoutUser();
            hideSideDrawer();
         }
   
   let currentNav; // Nav Items to display

   if(userContext.id){
      if(userContext.isCompany) currentNav = <CompanyNavItems logoutHandler={onLogoutHandler} />;
      else currentNav = <PersonNavItems logoutHandler={onLogoutHandler} />;
   }
   else currentNav = <AuthNavItems />;

   return (
      <ul className={styles.NavItems}>
         <NavItem url="/positions">
            Home
         </NavItem>
         {currentNav}
      </ul>
   );
}

export default NavItems;