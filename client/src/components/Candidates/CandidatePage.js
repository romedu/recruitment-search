import React, {useState, useEffect, Fragment} from "react";
import CandidateData from "./CandidateData";
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
        const {position} = candidateState.currentCandidate;
        
        content = (
            <Fragment>
               <h2>
                  {`Position Application: "${position.name}"`}
               </h2>    
               {candidateState.currentCandidate && <CandidateData candidate={candidateState.currentCandidate} />}
               <Button> Hire Employee </Button>
               <Button> Decline Application </Button>
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