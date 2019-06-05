import React, {useState} from "react";

const withLoader = PassedComponent => {
    return props => {
        const [spinnerState, setSpinnerState] = useState({ isLoading: false });
        
        const startLoadingHandler = () => setSpinnerState({ isLoading: true });
        
        const stopLoadingHandler = () => setSpinnerState({ isLoading: false });
        
        return (
            <PassedComponent isLoading={spinnerState.isLoading} 
                             startLoadingHandler={startLoadingHandler} 
                             stopLoadingHandler={stopLoadingHandler} 
                             {...props} />
        )
    }
}

export default withLoader;