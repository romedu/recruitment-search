import React, {useState} from "react";
import {Button, TextField} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput} from "../../utils/InputHandlers";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const ApplicationForm = props => {
    const [candidateState, setCandidateState] = useState({
        department: "",
        aspiringSalary: 0,
        recommendedBy: ""
    });
    
    const updateInputHandler = ({target}) => updateTextInput(setCandidateState, candidateState, target);
    
    const submitHandler = e => {
        e.preventDefault();
        
        const {positionId, history, startLoadingHandler, stopLoadingHandler, openModalHandler} = props,
              token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("POST", token, candidateState);
        
        startLoadingHandler();
        
        fetch(`/api/positions/${positionId}/candidates`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                history.push("/positions");
            })
            .catch(error => {
                stopLoadingHandler();
                openModalHandler(error.message);
            })
    }
    
    return (
        <form onSubmit={submitHandler}>
            <TextField
               id="outlined-full-width"
               label="Department"
               name="department"
               style={{ margin: 8 }}
               placeholder="Enter the position's department"
               fullWidth
               required
               margin="normal"
               variant="outlined"
               onChange={updateInputHandler}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <TextField
               id="outlined-full-width"
               label="Aspiring Salary"
               name="aspiringSalary"
               type="number"
               style={{ margin: 8 }}
               placeholder="Enter your aspiring salary"
               fullWidth
               required
               margin="normal"
               variant="outlined"
               onChange={updateInputHandler}
               InputLabelProps={{
                  shrink: true,
               }}
               inputProps={{
                    min: 0
                }}
            />
            <TextField
               id="outlined-full-width"
               label="Recommended By"
               name="recommendedBy"
               style={{ margin: 8 }}
               placeholder="Who recommended you for the job?"
               fullWidth
               margin="normal"
               variant="outlined"
               onChange={updateInputHandler}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <Button type="submit" disabled={props.isLoading}>
                Apply
            </Button>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </form>
    )
}

export default withErrorModal(withLoader(ApplicationForm));