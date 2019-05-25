import React, {useState, useEffect} from "react";
import PositionsList from "./PositionsList";

const Positions = () => {
   const [positionsState, setPositionState] = useState({
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
         {positionsState.positions && <PositionsList positions={positionsState.positions} />}
      </div>
   )
}

export default Positions;