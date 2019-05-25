import React, {useState, useEffect} from "react";
import FieldData from "../UI/FieldData";
import Button from "../UI/Button";

const PositionPage = props => {
    const [positionState, setPositionState] = useState({
        currentPosition: null
    });
    
    let content = <div></div>;
    
    useEffect(() => {
        const {positionId} = props.match;
        fetch(`/api/positions/${positionId}`)
            .then(response => response.json())
            .then(({error, position}) => {
                if(error) throw new Error(error.message);
                setPositionState({currentPosition: position});
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }, [])
    
    if(positionState.currentPosition){
        let {name, riskLevel, minimumSalary, maximumSalary, state} = positionState.currentPosition;
        
        content = (
            <div>
                <h2>
                    {`Position: ${name}`}
                </h2>    
                <FieldData title="Risk Level" description={riskLevel} />
                <FieldData title="Salary" description={`${minimumSalary}$ - ${maximumSalary}$`} />
                {state && <Button> Apply </Button>}
            </div>
        )
    }
    
    return (
        {content}    
    )
}

export default PositionPage;