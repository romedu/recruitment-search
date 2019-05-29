import React, {useState, useEffect, useContext} from "react";
import EmployeesList from "./EmployeesList";
import UserContext from "../../context/user-context";

const Employees = () => {
   const userContext = useContext(UserContext),
         [employeesState, setEmployeeState] = useState({
      employees: null
   });

   useEffect(() => {
      fetch(`/api/users/${userContext.id}/employees`)
         .then(response => response.json())
         .then(({error, employees}) => {
            if(error) throw new Error(error.message);
            setEmployeeState({employees});
         })
         .catch(error => {
            console.log("Create modal: ", error.message);
         })
   }, [])

   return (
      <div>
         <h1>
            Employees
         </h1>
         {employeesState.employees && <EmployeesList employees={employeesState.employees} />}
      </div>
   )
}

export default Employees;