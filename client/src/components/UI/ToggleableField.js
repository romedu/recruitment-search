import React from "react";
import {Link} from "react-router-dom";
import Button from "../UI/Button";

const ToggleableField = props => {
    let dataList;
    
    if(props.baseUrl){
        dataList = props.fieldData.map(data => (
            <Link key={data._id} to={`${props.baseUrl}/${data._id}`}>
                {data[props.identifier]}
            </Link>
        ))
    }
    else {
        dataList = props.fieldData.map(data => (
            <li key={data._id} >
                {data[props.identifier]}
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
            <Link to={props.creationUrl}>
                Create New
            </Link>
            <ul>
                {props.isDisplayed && dataList}
            </ul>
        </div>    
    )
}

export default ToggleableField;