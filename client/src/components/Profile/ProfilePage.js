import React, {useState, useEffect, useContext} from "react";
import Spinner from 'react-spinner-material';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, List, ListSubheader, Divider} from '@material-ui/core';
import UserFields from "./UserFields";
import CompanyFields from "./CompanyFields";
import PersonFields from "./PersonFields";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const ProfilePage = props => {
    const classes = useStyles(),
          userContext = useContext(UserContext),
          [profileState, setProfileState] = useState({
              userData: null
          });
          
    let content = null;
    
    useEffect(() => {
        const token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("GET", token);
           
        props.startLoadingHandler();   
              
        fetch(`/api/users/${userContext.id}`, fetchOptions)
            .then(response => response.json())
            .then(({error, user}) => {
                if(error) throw new Error(error.message);
                setProfileState({ userData: user })
                props.stopLoadingHandler();
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }, [props.match])
    
    if(profileState.userData){
        const {name, nationalId, isCompany, positions} = profileState.userData;
        if(isCompany){
            content = (
                <div>
                    <UserFields name={name} nationalId={nationalId} isCompany={isCompany} />
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            User Data
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <Divider />
                        <CompanyFields positions={positions} />
                    </List>
                </div>
            )
        }
        else {
            content = (
                <div>
                    <UserFields name={name} nationalId={nationalId} isCompany={isCompany} />
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            User Data
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <Divider />
                        <PersonFields {...profileState.userData} />
                    </List>
                </div>
            )
        }
    }
    
    return (
        <Paper style={{backgroundColor: "#fff", padding: "5%"}}>
            <Paper dp="24" style={{backgroundColor: "rgb(255, 249, 249)", padding: "5%"}}>
                <h2 style={{fontSize: "2em", margin: 0}}>
                    My Profile 
                </h2>
                {content}
                <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
            </Paper>
        </Paper>
    )
}

export default withErrorModal(withLoader(ProfilePage));