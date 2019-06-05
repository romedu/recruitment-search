import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {Button} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import InputField from "../UI/InputField";
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput} from "../../utils/InputHandlers";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const Login = props => {
   const userContext = useContext(UserContext);

   const [loginState, setLoginState] = useState({
      username: "",
      password: ""
   });

   const updateInputHandler = ({target}) => updateTextInput(setLoginState, loginState, target);

   const sumbitHandler = e => {
      e.preventDefault();
      const fetchOptions = getFetchOptions("POST", null, loginState);
      
      props.startLoadingHandler();
      
      fetch("/api/auth/login", fetchOptions)
         .then(response => response.json())
         .then(({error, ...userData}) => {
            if(error) throw new Error(error.message);
            userContext.setUser(userData);
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }

   return (
      <div>
         <h2>
            Login
         </h2>
         <form onSubmit={sumbitHandler}>
            <InputField type="text" name="username" value={loginState.username} changeHandler={updateInputHandler} required>
               Username
            </InputField>
            <InputField type="password" name="password" value={loginState.password} changeHandler={updateInputHandler} required>
               Password
            </InputField>
            <Button type="submit" disabled={props.isLoading}>
               Submit
            </Button>
         </form>
         <Link to="/authentication/register">
            New User?
         </Link>
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(Login));