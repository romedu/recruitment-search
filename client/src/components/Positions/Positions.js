import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import PositionsList from "./PositionsList";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";

const Positions = () => {
   const userContext = useContext(UserContext),
         [positionsState, setPositionState] = useState({
            positions: null
         });

   useEffect(() => {
      fetch("/api/positions")
         .then(response => response.json())
         .then(({error, positions}) => {
            if(error) throw new Error(error.message);
            setPositionState({positions});
         })
         .catch(error => props.openModalHandler(error.message))
   }, [])

   return (
      <div>
         <h1>
            Positions
         </h1>
         {userContext.isCompany && <Link to={`/positions/create`}> Create a position </Link>}
         {positionsState.positions && <PositionsList positions={positionsState.positions} />}
      </div>
   )
}

export default withErrorModal(Positions);