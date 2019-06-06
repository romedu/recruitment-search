import React, {useState, useEffect, useContext} from "react";
import Spinner from 'react-spinner-material';
import {Button} from '@material-ui/core';
import EmployeesList from "./EmployeesList";
import SearchBar from "../UI/SearchBar";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";
import withSearchBar from "../../hoc/withSearchBar";

const Employees = props => {
   const userContext = useContext(UserContext),
         [employeesState, setEmployeeState] = useState({
      employees: null
   });
   
   useEffect(() => {
      const searchEmployeesCall = async () => await searchEmployees(`/api/users/${userContext.id}/employees`);
      searchEmployeesCall();
   }, []);
   
   const submitSearchHandler = async e => {
      e.preventDefault();
      setEmployeeState({employees: null});
      await searchEmployees(`/api/users/${userContext.id}/employees?${props.searchOption}=${props.searchInputValue}`);
   }
   
   const resetSearchHandler = () => {
      setEmployeeState({employees: null});
      searchEmployees(`/api/users/${userContext.id}/employees`);
   }
   
   const searchEmployees = searchUrl => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
            
      props.startLoadingHandler();

      fetch(searchUrl, fetchOptions)
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
   }

   return (
      <div>
         <h1>
            Employees
         </h1>
         <SearchBar options={["position", "department"]} 
                    selectOption={props.searchOption} 
                    searchInput={props.searchInputValue} 
                    changeHandler={props.updateSearchInput}
                    submitHandler={submitSearchHandler} />
         <Button color="primary" onClick={resetSearchHandler}>
            Clear search
         </Button>
         {employeesState.employees && <EmployeesList employees={employeesState.employees} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(withSearchBar(Employees)));