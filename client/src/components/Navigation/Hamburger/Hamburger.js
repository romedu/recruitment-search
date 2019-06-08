import React from "react";
import styles from "./Hamburger.module.css";

const Hamburger = props => (
   <div className={styles.Hamburger} onClick={props.toggleHandler}>
      <div></div>
      <div></div>
      <div></div>
   </div>
);

export default Hamburger;