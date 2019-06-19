import React, {Fragment, useEffect} from "react";
import {withRouter} from "react-router-dom";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styles from "./SideDrawer.module.css";

const SideDrawer = props => {
   useEffect(() => {
      if(props.show) props.hide();
   }, [props.match])
   
   return (
      <Fragment>
         <Backdrop sideDrawer={true} show={props.show} hide={props.hide} />
         <div className={`${styles.SideDrawer} ${props.show ?  styles.Open : styles.Close}`}>
            <nav>
               <NavItems inSideDrawer={true} hideSideDrawer={props.hide} />
            </nav>
         </div>   
      </Fragment>
   );
}

export default withRouter(SideDrawer);