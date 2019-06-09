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
            employees: null,
            nextPage: 1,
            isDataFiltered: false
         });
   
   useEffect(() => {
      const searchEmployeesCall = () => searchEmployees(`/api/users/${userContext.id}/employees?page=1`, true);
      searchEmployeesCall();
   }, []);
   
   const submitSearchHandler = e => {
      e.preventDefault();
      setEmployeeState({
         employees: null, 
         nextPage: 1,
         isDataFiltered: true
      });
      searchEmployees(`/api/users/${userContext.id}/employees?${props.searchOption}=${props.searchInputValue}&page=1`, true);
   }
   
   const resetSearchHandler = () => {
      setEmployeeState({
         employees: null, 
         nextPage: 1,
         isDataFiltered: false
      });
      searchEmployees(`/api/users/${userContext.id}/employees?page=1`, true);
   }
   
   const searchEmployees = (searchUrl, isReplacingData) => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
            
      props.startLoadingHandler();

      fetch(searchUrl, fetchOptions)
         .then(response => response.json())
         .then(({error, employees}) => {
            if(error) throw new Error(error.message);
            if(isReplacingData) setEmployeeState(prevState => ({...prevState, employees: employees.docs, nextPage: employees.nextPage}));
            else setEmployeeState(prevState => ({
               ...prevState,
               employees: employeesState.employees.concat(employees.docs), 
               nextPage: employees.nextPage
            }));
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }
   
   window.onscroll = () => {
      const {nextPage, isDataFiltered} = employeesState,
            bottomScrollPosition = document.body.scrollHeight,
            currentScrollPosition = window.scrollY + window.innerHeight;
      
      if (currentScrollPosition >= bottomScrollPosition && !props.isLoading && nextPage){
         if(isDataFiltered) searchEmployees(`/api/users/${userContext.id}/employees?${props.searchOption}=${props.searchInputValue}&page=${nextPage}`);
         else searchEmployees(`/api/users/${userContext.id}/employees?page=${nextPage}`);
      }
   };

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