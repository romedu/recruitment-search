import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {Button, TextField} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {checkIfEmptyInputs} from "../../utils/input-validation";
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
   
   let areInputsInvalid = checkIfEmptyInputs(loginState);

   return (
      <div>
         <h2>
            Login
         </h2>
         <form onSubmit={sumbitHandler}>
            <TextField
               id="outlined-full-username"
               label="Username"
               name="username"
               error={props.existError}
               style={{ margin: 8 }}
               placeholder="Enter your username"
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
               id="outlined-full-password"
               label="Password"
               name="password"
               type="password"
               error={props.existError}
               style={{ margin: 8 }}
               placeholder="Enter your password"
               fullWidth
               required
               margin="normal"
               variant="outlined"
               onChange={updateInputHandler}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <Button type="submit" disabled={props.isLoading || areInputsInvalid}>
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