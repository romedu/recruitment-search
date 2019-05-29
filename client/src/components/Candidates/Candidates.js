import React, {useState, useEffect} from "react";
import CandidatesList from "./CandidatesList";
import {getFetchOptions} from "../../utils/fetchUtils";

const Candidates = props => {
   const {positionId} = props.match.params, 
         [candidatesState, setCandidatesState] = useState({
          candidates: null
         });

   useEffect(() => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
       
      fetch(`/api/positions/${positionId}/candidates`, fetchOptions)
         .then(response => response.json())
         .then(({error, candidates}) => {
            if(error) throw new Error(error.message);
            setCandidatesState({candidates});
         })
         .catch(error => {
            console.log("Create modal: ", error.message);
         })
   }, [props.match])

   return (
      <div>
         <h1>
            Candidates
         </h1>
         {candidatesState.candidates && <CandidatesList positionId={positionId} candidates={candidatesState.candidates} />}
      </div>
   )
}

export default Candidates;