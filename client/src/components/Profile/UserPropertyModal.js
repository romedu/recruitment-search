import React, {useState, useContext, Fragment} from "react";
import {Button} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {updateTextInput} from "../../utils/InputHandlers";
import Backdrop from "../UI/Backdrop/Backdrop";
import InputField from "../UI/InputField";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

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

      props.startLoadingHandler();

      fetch(`/api/users/${userContext.id}/${resourceName}`, fetchOptions)
         .then(response => response.json())
         .then(({error}) => {
            if(error) throw new Error(error.message);
            props.history.push("/my-profile");
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
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
               <Button type="submit" disabled={props.isLoading}>
                  {`Create ${resourceName}`}
               </Button>
            </form>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
         </div>
      </Fragment>
   )
}

export default withErrorModal(withLoader(UserPropertyModal));