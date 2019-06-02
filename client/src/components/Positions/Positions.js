import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import PositionsList from "./PositionsList";
import UserContext from "../../context/user-context";

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
         .catch(error => {
            console.log("Create modal: ", error.message);
         })
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

export default Positions;