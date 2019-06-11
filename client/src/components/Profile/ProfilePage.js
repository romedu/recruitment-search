import React, {useState, useEffect, useContext} from "react";
import Spinner from 'react-spinner-material';
import UserFields from "./UserFields";
import CompanyFields from "./CompanyFields";
import PersonFields from "./PersonFields";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const ProfilePage = props => {
    const userContext = useContext(UserContext),
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
                    <CompanyFields positions={positions} />
                </div>
            )
        }
        else {
            content = (
                <div>
                    <UserFields name={name} nationalId={nationalId} isCompany={isCompany} />
                    <PersonFields {...profileState.userData} />
                </div>
            )
        }
    }
    
    return (
        <div>
            <h2>
                My Profile 
            </h2>
            {content}
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </div>
    )
}

export default withErrorModal(withLoader(ProfilePage));