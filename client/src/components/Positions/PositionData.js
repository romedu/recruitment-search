import React from "react";
import FieldData from "../UI/FieldData";

const PositionData = ({position}) => (
    <div>
        <FieldData title="Risk Level" description={position.riskLevel} />
        <FieldData title="Salary" description={`${position.minimumSalary}$ - ${position.maximumSalary}$`} />
    </div>
);

export default PositionData;