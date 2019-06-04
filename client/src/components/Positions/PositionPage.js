import React, {useState, useEffect, useContext, Fragment} from "react";
import {Link} from "react-router-dom";
import PositionData from "./PositionData";
import Button from "../UI/Button";
import UserContext from "../../context/user-context";
import {getFetchOptions} from "../../utils/fetchUtils";
import withErrorModal from "../../hoc/withErrorModal";

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
            .catch(error => props.openModalHandler(error.message))
    }, [props]);
    
    const deletePositionHandler = () => {
        const {positionId} = props.match.params,
              token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("DELETE", token);
              
        fetch(`/api/positions/${positionId}`, fetchOptions)
            .then(response => response.json())
            .then(({error}) => {
                if(error) throw new Error(error.message);
                props.history.push("/positions");
            })
            .catch(error => props.openModalHandler(error.message))
    }
    
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
               {userContext.id === companyId && <Fragment>
                    <Link to={`/positions/${positionId}/candidates`}>
                        Candidates
                    </Link>
                    <Button action={deletePositionHandler}>
                        Delete Position
                    </Button>
               </Fragment>}
            </Fragment>
        )
    }
    
    return (
        <div>
           {content}
        </div>   
    )
}

export default withErrorModal(PositionPage);