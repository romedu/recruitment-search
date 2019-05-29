import React from "react";
import ApplicationForm from "./ApplicationForm";

const PositionApplication = props => {
    const {positionId} = props.match.params;
    
    return (
        <div>
            <h2>
                Position Application
            </h2>
            <ApplicationForm positionId={positionId} history={props.history} />
        </div> 
    )
}

export default PositionApplication;