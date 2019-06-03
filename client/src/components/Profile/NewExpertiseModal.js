import React, {useState, useContext, Fragment} from "react";
import {updateTextInput} from "../../utils/InputHandlers";
import Backdrop from "../UI/Backdrop/Backdrop";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";

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
              
        fetch(`/api/users/${userContext.id}/${props.expertiseName}`, fetchOptions)
            .then(response => response.json())
            .then(({error}) => {
                if(error) throw new Error(error.message);
                props.closeHandler();
            })
            .catch(error => console.log("Error: ", error.message))
    }
    
    const inputFields = props.properties.map((property, index) => (
        <InputField key={property.name + index} type={property.type} value={expertiseState[property.name]} changeHandler={updateInputHandler} required>
            {property.name.toUpperCase()}
        </InputField>
      ))
    
    return (
        <Fragment>
            <Backdrop show={true} hide={props.closeHandler} />
            <div>
                <h3>
                    Create {props.expertiseName}
                </h3>
                <form onSubmit={submitHandler}>
                    {inputFields}
                    <Button>
                        Create expertise
                    </Button>
                </form>
            </div>
        </Fragment>
    )
}

return NewExpertiseModal;