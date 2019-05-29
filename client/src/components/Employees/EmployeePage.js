import React, {useState, useEffect, useContext, Fragment} from "react";
import FieldData from "../UI/FieldData";
import Button from "../UI/Button";
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
    
    if(employeeState.currentEmployee){
        let {position, department, monthlySalary, userData, company, state} = employeeState.currentEmployee;
        
        content = (
            <Fragment>
               <h2>
                  {`Employee: ${position}`}
               </h2>    
               <FieldData title="Name" description={userData.name} />
               <FieldData title="Monthly Salary" description={`${monthlySalary}$`} />
               <FieldData title="Department" description={department} />
               <FieldData title="Company Name" description={company.name} />
               {state && <Button> Fire Employee </Button>}
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