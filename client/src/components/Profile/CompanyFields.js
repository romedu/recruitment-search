import React, {useState, Fragment} from "react";
import ToggleableField from "../UI/ToggleableField";

const CompanyFields = ({positions}) => {
    const [fieldsState, setFieldsState] = useState({
        displayPositions: false
    });
    
    const displayTogglerHandler = () => setFieldsState({ displayPositions: !fieldsState.displayPositions });
    
    return (
        <Fragment>
            <ToggleableField baseUrl="/positions" 
                             fieldData={positions} 
                             identifier="name" 
                             isDisplayed={fieldsState.displayPositions} 
                             toggleHandler={displayTogglerHandler} 
            >
                Positions
            </ToggleableField>
        </Fragment>
    )
}

export default CompanyFields;