import React, {useState} from "react";
import {Button, TextField} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {checkIfEmptyInputs} from "../../utils/input-validation";
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput} from "../../utils/InputHandlers";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

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
              
        props.startLoadingHandler();      
              
        fetch("/api/positions", fetchOptions)
            .then(response => response.json())
            .then(({error, newPosition}) => {
                if(error) throw new Error(error.message);
                props.history.push(`/positions/${newPosition._id}`);
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }
    
    let areInputsInvalid = checkIfEmptyInputs(positionState);
    
    return (
        <div>
            <h2>
                Create Position
            </h2>
            <form onSubmit={submitHandler}>
                <TextField
                    id="outlined-full-width"
                    label="Name"
                    name="name"
                    style={{ margin: 8 }}
                    placeholder="Enter the name of the position"
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
                    label="Risk Level"
                    name="riskLevel"
                    style={{ margin: 8 }}
                    placeholder="Enter the position's risk level"
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
                    label="Minimum Salary"
                    name="minimumSalary"
                    type="number"
                    style={{ margin: 8 }}
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
                    label="Maximum Salary"
                    name="maximumSalary"
                    type="number"
                    style={{ margin: 8 }}
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
                <Button style={{display: "block"}} type="submit" disabled={props.isLoading || areInputsInvalid}>
                    Create
                </Button>
            </form>
            <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </div>
    )
}

export default withErrorModal(withLoader(PositionCreate));