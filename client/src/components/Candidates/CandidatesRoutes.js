import React from "react";
import {Route, Switch} from "react-router-dom";
import Candidates from "./Candidates";
import CandidatePage from "./CandidatePage";

const CandidatesRoutes = () => (
    <Switch>
        <Route exact path="/positions/:positionId/candidates" component={Candidates} />
        <Route path="/positions/:positionId/candidates/:candidateId" component={CandidatePage} />
    </Switch>    
);

export default CandidatesRoutes;