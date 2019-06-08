import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import style from "./NavItem.module.css";

const NavItem = ({url, action, children}) => (
   <NavLink to={url} className={style.NavItem} onClick={action}>
      <Button color="inherit">
         {children}
      </Button>
   </NavLink>
);

export default NavItem;