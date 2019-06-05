import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import Spinner from 'react-spinner-material';
import PositionsList from "./PositionsList";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const Positions = props => {
   const userContext = useContext(UserContext),
         [positionsState, setPositionState] = useState({
            positions: null
         });

   useEffect(() => {
      props.startLoadingHandler();
      
      fetch("/api/positions")
         .then(response => response.json())
         .then(({error, positions}) => {
            if(error) throw new Error(error.message);
            setPositionState({positions});
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
            Positions
         </h1>
         {userContext.isCompany && <Link to={`/positions/create`}> Create a position </Link>}
         {positionsState.positions && <PositionsList positions={positionsState.positions} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(Positions));