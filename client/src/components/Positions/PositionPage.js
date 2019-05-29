import React, {useState, useEffect, Fragment} from "react";
import {Link} from "react-router-dom";
import PositionData from "./PositionData";

const PositionPage = props => {
    const [positionState, setPositionState] = useState({
        currentPosition: null
    });
    
    let content = null;
    
    useEffect(() => {
        const {positionId} = props.match.params;
        fetch(`/api/positions/${positionId}`)
            .then(response => response.json())
            .then(({error, position}) => {
                if(error) throw new Error(error.message);
                setPositionState({currentPosition: position});
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }, [props.match])
    
    if(positionState.currentPosition){
        const {positionId} = props.match.params,
              {name, state} = positionState.currentPosition;
        
        content = (
            <Fragment>
               <h2>
                  {`Position: ${name}`}
               </h2>    
               <PositionData position={positionState.currentPosition} />
               {state && <Link to={`/positions/${positionId}/application`}> Apply </Link>}
            </Fragment>
        )
    }
    
    return (
        <div>
           {content}
        </div>   
    )
}

export default PositionPage;