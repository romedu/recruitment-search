import React, {useState} from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput} from "../../utils/InputHandlers";
import withErrorModal from "../../hoc/withErrorModal";

const ApplicationForm = props => {
    const [candidateState, setCandidateState] = useState({
        department: "",
        aspiringSalary: 0,
        recommendedBy: ""
    });
    
    const updateInputHandler = ({target}) => updateTextInput(setCandidateState, candidateState, target);
    
    const submitHandler = e => {
        e.preventDefault();
        
        const {positionId} = props,
              token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("POST", token, candidateState);
        
        fetch(`/api/positions/${positionId}/candidates`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                props.history.push("/positions");
            })
            .catch(error => props.openModalHandler(error.message));
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
            <Button>
                Apply
            </Button>
        </form>
    )
}

export default withErrorModal(ApplicationForm);