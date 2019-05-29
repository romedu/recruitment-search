import React from "react";
import FieldData from "../UI/FieldData";

const EmployeeData = ({employee}) => (
    <div>
       <FieldData title="Name" description={employee.userData.name} />
       <FieldData title="Monthly Salary" description={`${employee.monthlySalary}$`} />
       <FieldData title="Department" description={employee.department} />
       <FieldData title="Company Name" description={employee.company.name} />
    </div>
);

export default EmployeeData;