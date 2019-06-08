import React, {useState, Fragment} from "react";
import NavBar from "./NavBar/NavBar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Toolbar from "./Toolbar/Toolbar";

const Navigation = () => {
   const [navBarState, setNavBarState] = useState({
            showingSideDrawer: false
         });

   const toggleSideDrawerHandler = () => setNavBarState({showingSideDrawer: !navBarState.showingSideDrawer});

   return (
      <Fragment>
         <NavBar />
         <Toolbar toggleHandler={toggleSideDrawerHandler} />
         <SideDrawer show={navBarState.showingSideDrawer} hide={toggleSideDrawerHandler} />
      </Fragment>
   );
};

export default Navigation;