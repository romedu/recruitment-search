import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import Candidates from "./Candidates";
import CandidatePage from "./CandidatePage";
import UserContext from "../../context/user-context";

const CandidatesRoutes = () => {
   const userContext = useContext(UserContext);

   return (
      <Switch>
         {userContext.isCompany && <Route exact path="/positions/:positionId/candidates" component={Candidates} />}
         <Route path="/positions/:positionId/candidates/:candidateId" component={CandidatePage} />
      </Switch>    
  );
}

export default CandidatesRoutes;