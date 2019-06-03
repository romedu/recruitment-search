import React, {useState, useContext, Fragment} from "react";
import {updateTextInput} from "../../utils/InputHandlers";
import Backdrop from "../UI/Backdrop/Backdrop";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";

const UserPropertyModal = props => {
   const {resourceName} = props.match.params,
         propertyName = resourceName === "languages" ? "name" : "description",
         userContext = useContext(UserContext),
         [propertyState, setPropertyState] = useState({
            [propertyName]: ""
         });

   const updateInputHandler = ({target}) => updateTextInput(setPropertyState, propertyState, target);
   
   const submitHandler = e => {
      e.preventDefault();
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("POST", token, propertyState);

      fetch(`/api/users/${userContext.id}/${resourceName}`, fetchOptions)
         .then(response => response.json())
         .then(({error}) => {
            if(error) throw new Error(error.message);
            props.history.push("/my-profile");
         })
         .catch(error => console.log("Error: ", error.message))
   }

   return (
      <Fragment>
         <Backdrop show={true} hide={() => props.history.push("/my-profile")} />
         <div style={{position: "fixed", width: "25vw", height: "25vw", top: "20vh", left: "37.5vw", zIndex: 101, backgroundColor: "white"}}>
            <h3>
               {resourceName.toUpperCase()}
            </h3>
            <form onSubmit={submitHandler}>
               <InputField name={propertyName} value={propertyState[propertyName]} changeHandler={updateInputHandler} required>
                  {propertyName.toUpperCase()}
               </InputField>
               <Button>
                  {`Create ${resourceName}`}
               </Button>
            </form>
         </div>
      </Fragment>
   )
}

export default UserPropertyModal;