import React from "react";
import Logo from "../../UI/Logo";
import Hamburger from "../Hamburger/Hamburger";
import styles from "./Toolbar.module.css";

const Toolbar = props => (
   <header className={styles.Toolbar}>
      <Hamburger toggleHandler={props.toggleHandler}/>
      <Logo />
   </header>
);

export default Toolbar;