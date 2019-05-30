import React, {useState, useEffect, useContext, Fragment} from "react";
import {Link} from "react-router-dom";
import PositionData from "./PositionData";
import UserContext from "../../context/user-context";

const PositionPage = props => {
    const userContext = useContext(UserContext),
          [positionState, setPositionState] = useState({
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
              {name, state, company: companyId} = positionState.currentPosition;
        
        content = (
            <Fragment>
               <h2>
                  {`Position: ${name}`}
               </h2>    
               <PositionData position={positionState.currentPosition} />
               {state && userContext.id && !userContext.isCompany && <Link to={`/positions/${positionId}/application`}> Apply </Link>}
               {userContext.id === companyId && <Link to={`/positions/${positionId}/candidates`}> Candidates </Link>}
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