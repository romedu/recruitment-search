import React, {useContext, Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Positions from "./Positions";
import PositionPage from "./PositionPage";
import PositionApplication from "./PositionApplication";
import CandidatesRoutes from "../Candidates/CandidatesRoutes";
import UserContext from "../../context/user-context";

const PositionsRoutes = () => {
   const userContext = useContext(UserContext);
   
   return (
      <Fragment>
         <Switch>
            <Route exact path="/positions" component={Positions} />
            <Route exact path="/positions/:positionId" component={PositionPage} />
            {userContext.id && !userContext.isCompany && <Route path="/positions/:positionId/application" component={PositionApplication} />}
            {userContext.id && userContext.isCompany && <Route path="/positions/:positionId/candidates" component={CandidatesRoutes} />}
         </Switch>
      </Fragment>
   )
}

export default PositionsRoutes;