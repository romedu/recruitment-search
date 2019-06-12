import React, {useState, useContext} from "react";
import {Button, TextField} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {updateTextInput} from "../../utils/InputHandlers";
import Modal from "../UI/Modal";
import UserContext from "../../context/user-context";
import {checkIfEmptyInputs} from "../../utils/input-validation";
import {getFetchOptions} from "../../utils/fetchUtils";
import {capitalizeString} from "../../utils/stringUtils";
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
   
   let areInputsInvalid = checkIfEmptyInputs(propertyState);

   return (
      <Modal open={true} label={`Create ${capitalizeString(resourceName)}`} closeHandler={() => props.history.push("/my-profile")}>
            <form onSubmit={submitHandler}>
               <TextField
                  id="outlined-full-width"
                  label={capitalizeString(propertyName)}
                  name={propertyName}
                  error={props.existError}
                  style={{ margin: 8 }}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  onChange={updateInputHandler}
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
               <Button type="submit" disabled={props.isLoading || areInputsInvalid}>
                  {`Create ${resourceName.slice(0, resourceName.length - 1)}`}
               </Button>
            </form>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </Modal>
   )
}

export default withErrorModal(withLoader(UserPropertyModal));