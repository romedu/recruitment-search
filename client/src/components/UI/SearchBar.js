import React from "react";
import {FormControl, InputLabel, NativeSelect, TextField, Input} from '@material-ui/core';
import {capitalizeString} from "../../utils/stringUtils";

const SearchBar = props => {
   const options = props.options.map((option, index) => <option key={option + index} value={option}> {capitalizeString(option)} </option>);

   return (
      <form autoComplete="off">
         <FormControl>
            <InputLabel shrink htmlFor="property-placeholder">
               Property
            </InputLabel>
            <NativeSelect value={props.selectOption} onChange={props.changeHandler} input={<Input name="property" id="property-placeholder" />}>
               {options}
            </NativeSelect>
         </FormControl>
         <FormControl>
            <TextField id="search-bar-input"
                       label="Search"
                       type="test"
                       margin="normal"
                       onChange={props.changeHandler}
                       value={props.searchInput} 
                       required />
         </FormControl>
      </form>
   );
}

export default SearchBar;