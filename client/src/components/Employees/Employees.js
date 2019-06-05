import React, {useState, useEffect, useContext} from "react";
import Spinner from 'react-spinner-material';
import EmployeesList from "./EmployeesList";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const Employees = props => {
   const userContext = useContext(UserContext),
         [employeesState, setEmployeeState] = useState({
      employees: null
   });

   useEffect(() => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
      
      props.startLoadingHandler();

      fetch(`/api/users/${userContext.id}/employees`, fetchOptions)
         .then(response => response.json())
         .then(({error, employees}) => {
            if(error) throw new Error(error.message);
            setEmployeeState({employees});
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }, [])

   return (
      <div>
         <h1>
            Employees
         </h1>
         {employeesState.employees && <EmployeesList employees={employeesState.employees} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(Employees));