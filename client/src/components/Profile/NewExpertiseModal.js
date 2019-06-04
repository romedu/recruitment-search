import React, {useState, useContext, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {updateTextInput} from "../../utils/InputHandlers";
import Backdrop from "../UI/Backdrop/Backdrop";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";
import {fromCamelToKebabCase} from "../../utils/stringUtils";
import withErrorModal from "../../hoc/withErrorModal";

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
              
        fetch(`/api/users/${userContext.id}/${fromCamelToKebabCase(props.expertiseName)}`, fetchOptions)
            .then(response => response.json())
            .then(({error}) => {
                if(error) throw new Error(error.message);
                props.history.push("/my-profile");
            })
            .catch(error => props.openModalHandler(error.message))
    }
    
    const inputFields = props.properties.map((property, index) => (
          <InputField key={property.name + index} 
                      name={property.name} 
                      type={property.type} 
                      value={expertiseState[property.name]} 
                      changeHandler={updateInputHandler} 
                      required
          >
             {property.name.toUpperCase()}
          </InputField>
      ))
    
    return (
        <Fragment>
            <Backdrop show={true} hide={() => props.history.push("/my-profile")} />
            <div style={{position: "fixed", width: "25vw", height: "25vw", top: "20vh", left: "37.5vw", zIndex: 101, backgroundColor: "white"}}>
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

export default withRouter(withErrorModal(NewExpertiseModal));