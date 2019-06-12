import React, {useState, useContext} from "react";
import {withRouter} from "react-router-dom";
import {Button, TextField} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import Modal from "../UI/Modal";
import {updateTextInput} from "../../utils/InputHandlers";
import UserContext from "../../context/user-context";
import {checkIfEmptyInputs} from "../../utils/input-validation";
import {getFetchOptions} from "../../utils/fetchUtils";
import {fromCamelToKebabCase, capitalizeString} from "../../utils/stringUtils";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const NewExpertiseModal = props => {
    const userContext = useContext(UserContext),
          initialState = props.properties.reduce((acc, nextVal) => {
            acc[nextVal.name] = nextVal.type === "number" ? 0 : "";
            return acc;
          }, {}),
          [expertiseState, setExpertiseState] = useState(initialState);
          
    const updateInputHandler = ({target}) => updateTextInput(setExpertiseState, expertiseState, target);
    
    const submitHandler = e => {
        e.preventDefault();
        const token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("POST", token, expertiseState);
        
        props.startLoadingHandler();
              
        fetch(`/api/users/${userContext.id}/${fromCamelToKebabCase(props.expertiseName)}`, fetchOptions)
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
    
    const inputFields = props.properties.map((property, index) => (
         <TextField
            key={property.name + index}
            id="outlined-full-width"
            label={capitalizeString(property.name)}
            name={property.name}
            type={property.type}
            style={{ margin: 8 }}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            onChange={updateInputHandler}
            InputLabelProps={{
               shrink: true,
            }}
            inputProps={property.validation}
         />
      ))
    
    let areInputsInvalid = checkIfEmptyInputs(expertiseState);
    
    return (
      <Modal open={true} label={`Create ${capitalizeString(props.expertiseName)}`} closeHandler={() => props.history.push("/my-profile")}>
            <form onSubmit={submitHandler}>
               {inputFields}
               <Button type="submit" disabled={props.isLoading || areInputsInvalid}>
                  Create expertise
               </Button>
            </form>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </Modal>
    )
}

export default withRouter(withErrorModal(withLoader(NewExpertiseModal)));