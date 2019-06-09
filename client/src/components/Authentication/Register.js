import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {Button, TextField, Checkbox, FormControlLabel} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import {getFetchOptions} from "../../utils/fetchUtils";
import {updateTextInput, updateCheckboxInput} from "../../utils/InputHandlers";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

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

      props.startLoadingHandler();

      fetch("/api/auth/register", fetchOptions)
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
            Register
         </h2>
         <form onSubmit={sumbitHandler}>
            <TextField
               id="outlined-full-width"
               label="Name"
               name="name"
               style={{ margin: 8 }}
               placeholder="Enter your full name"
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
               label="National ID"
               name="nationalId"
               style={{ margin: 8 }}
               placeholder="Enter your National ID or Passport number"
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
               label="Username"
               name="username"
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
               id="outlined-full-width"
               label="Password"
               name="password"
               type="password"
               style={{ margin: 8 }}
               placeholder="Enter your password"
               helperText="Between 8 and 15 characters"
               fullWidth
               required
               margin="normal"
               variant="outlined"
               onChange={updateInputHandler}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <FormControlLabel
               name="isCompany"
               value={registerState.isCompany}
               checked={registerState.isCompany}
               onChange={updateInputHandler}
               control={<Checkbox color="primary" />}
               label="Are you representing a company?"
               labelPlacement="start"
            />
            <Button type="submit" style={{display: "block"}} disabled={props.isLoading}>
               Submit
            </Button>
         </form>
         <Link to="/authentication/login">
            Already an user?
         </Link>
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(Register));