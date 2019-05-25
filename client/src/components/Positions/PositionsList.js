import React from "react";
import PositionThumbnail from "./PositionThumbnail";

const PositionsList = ({positions}) => {
   const positionsThumbnails = positions.map(position => <PositionThumbnail key={position._id}
                                                                            id={position._id}
                                                                            name={position.name}
                                                                            minimumSalary={position.minimumSalary}
                                                                            maximumSalary={position.maximumSalary}
                                                                            state={position.state} />);
   
   return (
      <ul>
         {positionsThumbnails}
      </ul>
   )
}

export default PositionsList;