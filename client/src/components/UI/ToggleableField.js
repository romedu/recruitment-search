import React from "react";
import {Link} from "react-router-dom";
import Button from "../UI/Button";
import {buildUrl} from "../../utils/stringUtils";

const ToggleableField = props => {
    let dataList;
    
    if(props.urlResources){
        dataList = props.fieldData.map(data => (
            <Link key={data._id} to={buildUrl(data, props.urlResources, props.urlResourcesIds)} style={{display: "block"}}>
               {props.identifiers.reduce((acc, nextVal) => acc[nextVal], data)}
            </Link>
        ))
    }
    else {
        dataList = props.fieldData.map(data => (
            <li key={data._id} >
               {props.identifiers.reduce((acc, nextVal) => acc[nextVal], data)}
            </li>
        ))
    }
    
    return (
        <div>
            <h3>
                {props.children}
            </h3>
            <Button style={{float: "right"}} action={props.toggleHandler}>
                {props.isDisplayed ? "Hide" : "Show"}
            </Button>
            {props.creationUrl && <Link to={props.creationUrl}>
                Create New
            </Link>}
            <ul>
                {props.isDisplayed && dataList}
            </ul>
        </div>    
    )
}

export default ToggleableField;