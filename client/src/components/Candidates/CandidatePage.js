import React, {useState, useEffect, useContext, Fragment} from "react";
import CandidateData from "./CandidateData";
import Button from "../UI/Button";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";

const CandidatePage = props => {
    const userContext = useContext(UserContext),
          [candidateState, setCandidateState] = useState({
              currentCandidate: null
          });
    
    let content = null;
    
    useEffect(() => {
        const token = localStorage.getItem("token"),
              {positionId, candidateId} = props.match.params,
              fetchOptions = getFetchOptions("GET", token);
              
        fetch(`/api/positions/${positionId}/candidates/${candidateId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                setCandidateState({currentCandidate: candidate});
            })
            .catch(error => {
                console.log("Error: ", error.message);
            })
    }, [props.match])
    
    const hireCandidate = () => {
        const token = localStorage.getItem("token"),
              {position, department, aspiringSalary, userData} = candidateState.currentCandidate,
              newCandidateBody = {
                department,
                position: position.name,
                monthlySalary: aspiringSalary,
                userData: userData._id
              },
              fetchOptions = getFetchOptions("POST", token, newCandidateBody);
              
        fetch(`/api/users/${userContext.id}/employees`, fetchOptions)
            .then(response => response.json())
            .then(({error, newEmployee}) => {
                if(error) throw new Error(error.message);
                deleteCandidate();
            })
            .catch(error => console.log("Error: ", error.message))
    }
    
    const deleteCandidate = () => {
        const token = localStorage.getItem("token"),
              {positionId, candidateId} = props.match.params,
              fetchOptions = getFetchOptions("DELETE", token);

        fetch(`/api/positions/${positionId}/candidates/${candidateId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                props.history.push(`/positions/${positionId}/candidates`);
            })
            .catch(error => console.log("Error: ", error.message))
    }
    
    if(candidateState.currentCandidate){
        const {position} = candidateState.currentCandidate;
        
        content = (
            <Fragment>
               <h2>
                  {`Position Application: "${position.name}"`}
               </h2>    
               {candidateState.currentCandidate && <CandidateData candidate={candidateState.currentCandidate} />}
               <Button action={hireCandidate}> Hire Candidate </Button>
               <Button action={deleteCandidate}> Decline Candidate </Button>
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