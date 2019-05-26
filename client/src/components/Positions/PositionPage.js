import React, {useState, useEffect, Fragment} from "react";
import FieldData from "../UI/FieldData";
import Button from "../UI/Button";

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
        let {name, riskLevel, minimumSalary, maximumSalary, state} = positionState.currentPosition;
        
        content = (
            <Fragment>
               <h2>
                  {`Position: ${name}`}
               </h2>    
               <FieldData title="Risk Level" description={riskLevel} />
               <FieldData title="Salary" description={`${minimumSalary}$ - ${maximumSalary}$`} />
               {state && <Button> Apply </Button>}
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