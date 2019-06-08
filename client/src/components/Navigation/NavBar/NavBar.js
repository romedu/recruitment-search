import React from "react";
import {AppBar, Typography, Toolbar as MaterialToolbar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import NavItems from "../NavItems/NavItems";
import Logo from "../../UI/Logo";
import styles from "./NavBar.module.css";

const useStyles = makeStyles(theme => ({
   menuButton: {
     marginRight: theme.spacing(2),
   },
   title: {
     flexGrow: 1,
   },
 }));

const NavBar = () => {
   const classes = useStyles();

   return (
      <div className={styles.NavBar}>
         <AppBar position="static" color="secondary">
            <MaterialToolbar>
               <Logo className={classes.menuButton} />
               <Typography variant="h6" className={classes.title}>
                  Firehired
               </Typography>
               <NavItems />
            </MaterialToolbar>
         </AppBar>
      </div>
   );
};

export default NavBar;