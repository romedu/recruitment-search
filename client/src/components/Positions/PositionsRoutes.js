import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import Positions from "./Positions";

const PositionsRoutes = () => (
   <Fragment>
      <Route path="/" component={Positions} />
   </Fragment>
)

export default PositionsRoutes;