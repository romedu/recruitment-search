import React, {useState} from "react";
import Spinner from 'react-spinner-material';

const withLoader = PassedComponent => {
    return props => {
        const [spinnerState, setSpinnerState] = useState({ isLoading: true });
        
        const startLoadingHandler = () => setSpinnerState({ isLoading: true });
        
        const stopLoadingHandler = () => setSpinnerState({ isLoading: false });
        
        return (
            spinnerState.isLoading ? <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} /> 
                                   : <PassedComponent startLoadingHandler={startLoadingHandler} stopLoadingHandler={stopLoadingHandler} {...props} />
        )
    }
}

export default withLoader;