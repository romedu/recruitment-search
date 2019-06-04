import React, {useState} from "react";
import InputField from "../UI/InputField";
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput} from "../../utils/InputHandlers";
import Button from "../UI/Button";
import withErrorModal from "../../hoc/withErrorModal";

const PositionCreate = props => {
    const [positionState, setPositionState] = useState({
            name: "",
            riskLevel: "",
            minimumSalary: 0,
            maximumSalary: 0
          });
    
    const updateInputHandler = ({target}) => updateTextInput(setPositionState, positionState, target);
    
    const submitHandler = e => {
        e.preventDefault();
        
        const token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("POST", token, positionState);
              
        fetch("/api/positions", fetchOptions)
            .then(response => response.json())
            .then(({error, newPosition}) => {
                if(error) throw new Error(error.message);
                props.history.push(`/positions/${newPosition._id}`);
            })
            .catch(error => props.openModalHandler(error.message))
    }
    
    return (
        <div>
            <h2>
                Create Position
            </h2>
            <form onSubmit={submitHandler}>
                <InputField name="name" value={positionState.name} changeHandler={updateInputHandler} required>
                    Name
                </InputField>
                <InputField name="riskLevel" value={positionState.riskLevel} changeHandler={updateInputHandler} required>
                    Risk Level
                </InputField>
                <InputField name="minimumSalary" type="number" value={positionState.minimumSalary} changeHandler={updateInputHandler} required>
                    Minimum Salary
                </InputField>
                <InputField name="maximumSalary" type="number" value={positionState.maximumSalary} changeHandler={updateInputHandler} required>
                    Maximum Salary
                </InputField>
                <Button>
                    Create
                </Button>
            </form>
        </div>
    )
}

export default withErrorModal(PositionCreate);