import React from "react";
import {FormControl, InputLabel, NativeSelect, TextField, Input} from '@material-ui/core';
import {capitalizeString} from "../../utils/stringUtils";

const SearchBar = props => {
   // An empty string is added to the beggining of the options list
   // To make sure no value is selected by default
   props.options.unshift("");
   const options = props.options.map((option, index) => <option key={option + index} value={option}> {capitalizeString(option)} </option>);
   return (
      <form autoComplete="off" onSubmit={props.submitHandler}>
         <FormControl>
            <InputLabel shrink htmlFor="property-placeholder">
               Property
            </InputLabel>
            <NativeSelect value={props.selectOption}
                          onChange={props.changeHandler}
                          required
                          input={<Input name="selectOption" id="property-placeholder" />}
            >
               {options}
            </NativeSelect>
         </FormControl>
         <FormControl>
            <TextField id="search-bar-input"
                       label="Search"
                       type="test"
                       name="searchInput"
                       margin="normal"
                       onChange={props.changeHandler}
                       value={props.searchInput} 
                       required />
         </FormControl>
      </form>
   );
}

export default SearchBar;