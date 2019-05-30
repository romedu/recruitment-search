import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Employees from "./Employees";
import EmployeePage from "./EmployeePage";

const EmployeesRoutes = () => (
   <Fragment>
      <Switch>
         <Route path="/my-employees/:employeeId" component={EmployeePage} />
         <Route exact path="/my-employees" component={Employees} />
      </Switch>
   </Fragment>
)

export default EmployeesRoutes;