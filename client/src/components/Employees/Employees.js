import React, {useState, useEffect, useContext} from "react";
import EmployeesList from "./EmployeesList";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";

const Employees = props => {
   const userContext = useContext(UserContext),
         [employeesState, setEmployeeState] = useState({
      employees: null
   });

   useEffect(() => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);

      fetch(`/api/users/${userContext.id}/employees`, fetchOptions)
         .then(response => response.json())
         .then(({error, employees}) => {
            if(error) throw new Error(error.message);
            setEmployeeState({employees});
         })
         .catch(error => props.openModalHandler(error.message))
   }, [userContext.id, props])

   return (
      <div>
         <h1>
            Employees
         </h1>
         {employeesState.employees && <EmployeesList employees={employeesState.employees} />}
      </div>
   )
}

export default withErrorModal(Employees);