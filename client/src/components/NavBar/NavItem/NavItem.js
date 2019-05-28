import React from "react";
import {NavLink} from "react-router-dom";
import style from "./NavItem.module.css";

const NavItem = ({url, action, children}) => (
   <NavLink to={url} onClick={action} className={style.NavItem}>
      {children}
   </NavLink>
);

export default NavItem;