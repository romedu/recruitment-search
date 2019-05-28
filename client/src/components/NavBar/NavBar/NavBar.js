import React, {useState, Fragment} from "react";
import NavItems from "../NavItems/NavItems";
import SideDrawer from "../SideDrawer/SideDrawer";
import Toolbar from "../Toolbar/Toolbar";
import Logo from "../../UI/Logo";
import styles from "./NavBar.module.css";

const NavBar = () => {
   const [navBarState, setNavBarState] = useState({
      showingSideDrawer: false
   });

   const toggleSideDrawerHandler = () => setNavBarState({showingSideDrawer: !navBarState.showingSideDrawer});

   return (
      <Fragment>
         <nav className={styles.NavBar}>
            <Logo />
            <NavItems />
         </nav>
         <Toolbar toggleHandler={toggleSideDrawerHandler} />
         <SideDrawer show={navBarState.showingSideDrawer} hide={toggleSideDrawerHandler} />
      </Fragment>
   );
};

export default NavBar;