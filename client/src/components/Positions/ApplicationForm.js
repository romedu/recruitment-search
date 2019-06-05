import React, {useState} from "react";
import {Button} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import InputField from "../UI/InputField";
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
            <InputField name="department" value={candidateState.department} changeHandler={updateInputHandler} required>
                Department:
            </InputField>
            <InputField name="aspiringSalary" type="number" value={candidateState.aspiringSalary} changeHandler={updateInputHandler} required>
                Aspiring Salary:
            </InputField>
            <InputField name="recommendedBy" value={candidateState.recommendedBy} changeHandler={updateInputHandler}>
                Recommended By:
            </InputField>
            <Button type="submit" disabled={props.isLoading}>
                Apply
            </Button>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </form>
    )
}

export default withErrorModal(withLoader(ApplicationForm));