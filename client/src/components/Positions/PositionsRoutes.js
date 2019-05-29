import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Positions from "./Positions";
import PositionPage from "./PositionPage";
import PositionApplication from "./PositionApplication";

const PositionsRoutes = () => (
   <Fragment>
      <Switch>
         <Route path="/positions/:positionId/application" component={PositionApplication} />
         <Route path="/positions/:positionId" component={PositionPage} />
         <Route exact path="/positions" component={Positions} />
      </Switch>
   </Fragment>
)

export default PositionsRoutes;