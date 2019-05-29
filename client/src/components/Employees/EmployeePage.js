import React, {useState, useEffect, useContext, Fragment} from "react";
import EmployeeData from "./EmployeeData";
import Button from "../UI/Button";
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";

const EmployeePage = props => {
    const [employeeState, setEmployeeState] = useState({
        currentEmployee: null
    });
    
    let content = null;
    
    useEffect(() => {
        const userContext = useContext(UserContext),
              {employeeId} = props.match.params;
              
        fetch(`/api/users/${userContext.id}/employees/${employeeId}`)
            .then(response => response.json())
            .then(({error, employee}) => {
                if(error) throw new Error(error.message);
                setEmployeeState({currentEmployee: employee});
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }, [props.match])
    
    const fireEmployee = () => {
        const token = localStorage.getItem("token"),
              userContext = useContext(UserContext),
              {employeeId} = props.match.params,
              fetchOptions = getFetchOptions("DELETE", token);
              
        fetch(`/api/users/${userContext.id}/employees/${employeeId}`, fetchOptions)
            .then(response => response.json())
            .then(({error, employee}) => {
                if(error) throw new Error(error.message);
                props.history.push("/my-employees");
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }
    
    if(employeeState.currentEmployee){
        let {position, state} = employeeState.currentEmployee;
        
        content = (
            <Fragment>
               <h2>
                  {`Employee: ${position}`}
               </h2>    
               <EmployeeData employee={employeeState.currentEmployee} />
               {state && <Button onClick={fireEmployee}> Fire Employee </Button>}
            </Fragment>
        )
    }
    
    return (
        <div>
           {content}
        </div>   
    )
}

export default EmployeePage;