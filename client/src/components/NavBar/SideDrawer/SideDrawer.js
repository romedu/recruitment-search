import React, {Fragment} from "react";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styles from "./SideDrawer.module.css";

const SideDrawer = props => (
   <Fragment>
      <Backdrop sideDrawer={true} show={props.show} hide={props.hide} />
      <div className={`${styles.SideDrawer} ${props.show ?  styles.Open : styles.Close}`}>
         <nav>
            <NavItems />
         </nav>
      </div>   
   </Fragment>
);

export default SideDrawer;