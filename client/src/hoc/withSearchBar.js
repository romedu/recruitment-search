import React, {useState} from "react";
import {updateTextInput} from "../utils/InputHandlers";

const withSearchBar = PassedComponent => {
    return props => {
        const [searchState, setSearchState] = useState({
            selectOption: "",
            searchInput: ""
        });
        
        const updateInputHandler = ({target}) => updateTextInput(setSearchState, searchState, target);
        
        return (
            <PassedComponent searchOption={searchState.selectOption} 
                             searchInputValue={searchState.searchInput} 
                             updateSearchInput={updateInputHandler} 
                             {...props} />    
        )
    }
}

export default withSearchBar;