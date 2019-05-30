import React from "react";

const InputField = props => (
   <fieldset>
      <label htmlFor={props.name}>
         {props.children}
      </label>
      <input type={props.type} 
             name={props.name} 
             value={props.value} 
             onChange={props.changeHandler} 
             required={props.required}
             disabled={props.disabled}
             checked={props.value} />
   </fieldset>
);

export default InputField;