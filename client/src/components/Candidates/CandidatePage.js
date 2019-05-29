import React, {useState, useEffect, Fragment} from "react";
import FieldData from "../UI/FieldData";
import Button from "../UI/Button";

const CandidatePage = props => {
    const [candidateState, setCandidateState] = useState({
        currentCandidate: null
    });
    
    let content = null;
    
    useEffect(() => {
        const {positionId, candidateId} = props.match.params;
              
        fetch(`/api/users/${positionId}/candidates/${candidateId}`)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                setCandidateState({currentCandidate: candidate});
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }, [props.match])
    
    if(candidateState.currentCandidate){
        const {position, department, aspiringSalary, recommendedBy, userData} = candidateState.currentCandidate;
        
        content = (
            <Fragment>
               <h2>
                  {`Position Application: "${position.name}"`}
               </h2>    
               <FieldData title="Candidate Name" description={userData.name} />
               <FieldData title="Candidate National ID" description={userData.nationalId} />
               <FieldData title="Aspiring Salary" description={`${aspiringSalary}$`} />
               <FieldData title="Department" description={department} />
               <FieldData title="Recommended By" description={recommendedBy} />
               <Button> Hire Employee </Button>
            </Fragment>
        )
    }
    
    return (
        <div>
           {content}
        </div>   
    )
}

export default CandidatePage;