import React, {useState, useEffect, useContext, Fragment} from "react";
import Spinner from 'react-spinner-material';
import {Button, Paper} from '@material-ui/core';
import EmployeeData from "./EmployeeData";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const EmployeePage = props => {
    const userContext = useContext(UserContext),
          [employeeState, setEmployeeState] = useState({
             currentEmployee: null
          });
    
    let content = null;
    
    useEffect(() => {
        const token = localStorage.getItem("token"),
              {employeeId} = props.match.params,
              fetchOptions = getFetchOptions("GET", token);
        
        props.startLoadingHandler();
              
        fetch(`/api/users/${userContext.id}/employees/${employeeId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, employee}) => {
                if(error) throw new Error(error.message);
                setEmployeeState({currentEmployee: employee});
                props.stopLoadingHandler();
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }, [])
    
    const fireEmployee = () => {
        const token = localStorage.getItem("token"),
              {employeeId} = props.match.params,
              fetchOptions = getFetchOptions("DELETE", token);
        
        props.startLoadingHandler();
              
        fetch(`/api/users/${userContext.id}/employees/${employeeId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, employee}) => {
                if(error) throw new Error(error.message);
                props.history.push("/my-employees");
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }
    
    if(employeeState.currentEmployee){
        let {position, state} = employeeState.currentEmployee;
        
        content = (
            <Fragment>
               <h2 style={{fontSize: "2em", margin: 0}}>
                  {`Employee: ${position}`}
               </h2>    
               <EmployeeData employee={employeeState.currentEmployee} />
               {state && <Button onClick={fireEmployee} disabled={props.isLoading} >
                   Fire Employee
               </Button>}
            </Fragment>
        )
    }
    
    return (
        <Paper style={{backgroundColor: "#fff", padding: "5%"}}>
            <Paper dp="24" style={{backgroundColor: "rgb(255, 249, 249)", padding: "5%"}}>
                {content}
                <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
            </Paper>
        </Paper>
    )
}

export default withErrorModal(withLoader(EmployeePage));