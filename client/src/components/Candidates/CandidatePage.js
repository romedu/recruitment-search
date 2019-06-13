import React, {useState, useEffect, useContext, Fragment} from "react";
import Spinner from 'react-spinner-material';
import {Button, Paper} from '@material-ui/core';
import CandidateData from "./CandidateData";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

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
        
        props.startLoadingHandler();
          
        fetch(`/api/positions/${positionId}/candidates/${candidateId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                setCandidateState({currentCandidate: candidate});
                props.stopLoadingHandler();
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }, [])
    
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
         
        props.startLoadingHandler();  
              
        fetch(`/api/users/${userContext.id}/employees`, fetchOptions)
            .then(response => response.json())
            .then(({error, newEmployee}) => {
                if(error) throw new Error(error.message);
                deleteCandidate();
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
             })
    }
    
    const deleteCandidate = () => {
        const token = localStorage.getItem("token"),
              {positionId, candidateId} = props.match.params,
              fetchOptions = getFetchOptions("DELETE", token);

        if(!props.isLoading) props.startLoadingHandler();

        fetch(`/api/positions/${positionId}/candidates/${candidateId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, candidate}) => {
                if(error) throw new Error(error.message);
                if(userContext.isCompany) props.history.push(`/positions/${positionId}/candidates`);
                else props.history.push("/my-profile");
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
             })
    }
    
    if(candidateState.currentCandidate){
        const {position} = candidateState.currentCandidate;
        
        content = (
            <Fragment>
               <h3>
                  "{position.name}"
               </h3>
               {candidateState.currentCandidate && <CandidateData candidate={candidateState.currentCandidate} />}
               {userContext.isCompany && <Button color="primary" onClick={hireCandidate} disabled={props.isLoading} >
                  Hire Candidate
               </Button>}
               <Button color="primary" onClick={deleteCandidate} disabled={props.isLoading} >
                  {userContext.isCompany ? "Decline Candidate" : "Delete application"}
               </Button>
            </Fragment>
        )
    }
    
    return (
        <Paper style={{backgroundColor: "#fff", padding: "5%"}}>
            <Paper dp="24" style={{backgroundColor: "rgb(255, 249, 249)", padding: "5%"}}>
                <h2 style={{fontSize: "2em", margin: 0}}>
                    Position Application
                </h2>   
                    {content}
                <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
            </Paper>
        </Paper>
    )
}

export default withErrorModal(withLoader(CandidatePage));