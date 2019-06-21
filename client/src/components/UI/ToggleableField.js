import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {List, Button, ListItem, ListItemText, ListItemSecondaryAction, Collapse} from '@material-ui/core';
import {buildUrl} from "../../utils/stringUtils";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

const ToggleableField = props => {
    const classes = useStyles();
    let dataList;
    
    if(props.urlResources){
        dataList = props.fieldData.map(data => (
            <ListItem 
                key={data._id} 
                button 
                className={classes.nested}
            >
                <Link 
                    to={buildUrl(data, props.urlResources, props.urlResourcesIds)} 
                    // style={{display: "block"}}
                >
                    <ListItemText primary={props.identifiers.reduce((acc, nextVal) => acc[nextVal], data)} />
                </Link>
            </ListItem>
            
               
            
        ))
    }
    else {
        dataList = props.fieldData.map(data => (
            <ListItem 
                key={data._id} 
                button 
                className={classes.nested}
            >
                <ListItemText primary={props.identifiers.reduce((acc, nextVal) => acc[nextVal], data)} />
            </ListItem>
        ))
    }
    
    return (
        <Fragment>
                <ListItem button onClick={props.toggleHandler}>
                    <ListItemText primary={props.children} />
                    {props.creationUrl && <ListItemSecondaryAction>
                        <Link to={props.creationUrl}>
                            <Button>
                                +
                            </Button>
                        </Link>
                    </ListItemSecondaryAction>}
                </ListItem>
                <Collapse in={props.isDisplayed} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {dataList}
                    </List>
                </Collapse>
        </Fragment>    
    )
}

export default ToggleableField;