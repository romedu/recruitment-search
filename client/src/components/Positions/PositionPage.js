import React, {useState, useEffect, useContext, Fragment} from "react";
import {Link} from "react-router-dom";
import {Button, Paper} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import PositionData from "./PositionData";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const PositionPage = props => {
    const userContext = useContext(UserContext),
          [positionState, setPositionState] = useState({
            currentPosition: null
          });
    
    let content = null;
    
    useEffect(() => {
        const {positionId} = props.match.params;
        
        props.startLoadingHandler();
        
        fetch(`/api/positions/${positionId}`)
            .then(response => response.json())
            .then(({error, position}) => {
                if(error) throw new Error(error.message);
                setPositionState({currentPosition: position});
                props.stopLoadingHandler();
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }, []);
    
    const deletePositionHandler = () => {
        const {positionId} = props.match.params,
              token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("DELETE", token);
        
        props.startLoadingHandler();
              
        fetch(`/api/positions/${positionId}`, fetchOptions)
            .then(response => response.json())
            .then(({error}) => {
                if(error) throw new Error(error.message);
                props.history.push("/positions");
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }
    
    if(positionState.currentPosition){
        const {positionId} = props.match.params,
              {name, state, company: companyId} = positionState.currentPosition;
        
        content = (
            <Paper style={{backgroundColor: "#fff", padding: "5%"}}>
                <Paper dp="24" style={{backgroundColor: "rgb(255, 249, 249)", padding: "5%"}}>
                   <h2 style={{fontSize: "2em", margin: 0}}>
                      {`Position: ${name}`}
                   </h2>    
                   <PositionData position={positionState.currentPosition} />
                   {state && userContext.id && !userContext.isCompany && <Link to={`/positions/${positionId}/application`}> 
                      Apply 
                   </Link>}
                   {userContext.id === companyId && <Fragment>
                        <Link to={`/positions/${positionId}/candidates`}>
                            Candidates
                        </Link>
                        <Button onClick={deletePositionHandler} disabled={props.isLoading} >
                            Delete Position
                        </Button>
                   </Fragment>}
                </Paper>
            </Paper>
        )
    }
    
    return (
        <div>
           {content}
           <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </div>   
    )
}

export default withErrorModal(withLoader(PositionPage));