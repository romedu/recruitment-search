import React from "react";
import EmployeeThumbnail from "./EmployeeThumbnail";

const EmployeesList = ({employees}) => {
   const employeesThumbnails = employees.map(employee => <EmployeeThumbnail key={employee._id}
                                                                            id={employee._id}
                                                                            position={employee.position}
                                                                            monthlySalary={employee.monthlySalary}
                                                                            state={employee.state} />);
   
   return (
      <ul>
         {employeesThumbnails}
      </ul>
   )
}

export default EmployeesList;