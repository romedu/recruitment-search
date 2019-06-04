import React, {useState, useEffect, useContext} from "react";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import UserFields from "./UserFields";
import CompanyFields from "./CompanyFields";
import PersonFields from "./PersonFields";
import withErrorModal from "../../hoc/withErrorModal";

const ProfilePage = props => {
    const userContext = useContext(UserContext),
          [profileState, setProfileState] = useState({
              userData: null
          });
          
    let content = null;
    
    useEffect(() => {
        const token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("GET", token);
              
        fetch(`/api/users/${userContext.id}`, fetchOptions)
            .then(response => response.json())
            .then(({error, user}) => {
                if(error) throw new Error(error.message);
                setProfileState({ userData: user })
            })
            .catch(error => props.openModalHandler(error.message))
    }, [userContext, props])
    
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
        </div>
    )
}

export default withErrorModal(ProfilePage);