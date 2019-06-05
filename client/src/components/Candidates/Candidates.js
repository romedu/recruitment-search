import React, {useState, useEffect} from "react";
import Spinner from 'react-spinner-material';
import CandidatesList from "./CandidatesList";
import {getFetchOptions} from "../../utils/fetchUtils";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const Candidates = props => {
   const {positionId} = props.match.params, 
         [candidatesState, setCandidatesState] = useState({
          candidates: null
         });

   useEffect(() => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
      
      props.startLoadingHandler();
       
      fetch(`/api/positions/${positionId}/candidates`, fetchOptions)
         .then(response => response.json())
         .then(({error, candidates}) => {
            if(error) throw new Error(error.message);
            setCandidatesState({candidates});
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }, [])

   return (
      <div>
         <h1>
            Candidates
         </h1>
         {candidatesState.candidates && <CandidatesList positionId={positionId} candidates={candidatesState.candidates} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(Candidates));