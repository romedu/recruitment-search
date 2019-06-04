import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput, updateCheckboxInput} from "../../utils/InputHandlers";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";

const Register = props => {
   const userContext = useContext(UserContext);

   const [registerState, setRegisterState] = useState({
      name: "",
      nationalId: "",
      username: "",
      password: "",
      isCompany: false
   });

   const updateInputHandler = ({target}) => {
      if(target.type === "checkbox") updateCheckboxInput(setRegisterState, registerState, target.name);
      else updateTextInput(setRegisterState, registerState, target);
   }

   const sumbitHandler = e => {
      e.preventDefault();
      const fetchOptions = getFetchOptions("POST", null, registerState);

      fetch("/api/auth/register", fetchOptions)
         .then(response => response.json())
         .then(({error, ...userData}) => {
            if(error) throw new Error(error.message);
            userContext.setUser(userData);
         })
         .catch(error => props.openModalHandler(error.message))
   }

   return (
      <div>
         <h2>
            Register
         </h2>
         <form onSubmit={sumbitHandler}>
            <InputField type="text" name="name" value={registerState.name} changeHandler={updateInputHandler} required>
                  Name
            </InputField>
            <InputField type="text" name="nationalId" value={registerState.nationalId} changeHandler={updateInputHandler} required>
               National ID
            </InputField>
            <InputField type="text" name="username" value={registerState.username} changeHandler={updateInputHandler} required>
               Username
            </InputField>
            <InputField type="password" name="password" value={registerState.password} changeHandler={updateInputHandler} required>
               Password
            </InputField>
            <InputField type="checkbox" name="isCompany" value={registerState.isCompany} changeHandler={updateInputHandler}>
               Are you representing a company?
            </InputField>
            <Button>
               Submit
            </Button>
         </form>
         <Link to="/authentication/login">
            Already an user?
         </Link>
      </div>
   )
}

export default withErrorModal(Register);