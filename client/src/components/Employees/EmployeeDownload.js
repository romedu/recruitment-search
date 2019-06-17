import React, {useState, useEffect, useContext, useRef} from "react";
import Spinner from 'react-spinner-material';
import {Button} from '@material-ui/core';
import {getFetchOptions} from "../../utils/fetchUtils";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";

const EmployeeDownload = props => {
    const userContext = useContext(UserContext),
          downloadLinkRef = useRef(null),
          [fileState, setFileState] = useState({
            fileUrl: null
          })
    
    useEffect(() => {
        if(fileState.fileUrl) downloadLinkRef.current.click();
    }, [fileState.fileUrl])
    
    const getFile = () => {
        const {employeeId} = props,
              token = localStorage.getItem("token"),
              fetchOptions = getFetchOptions("GET", token);
            
        props.startLoadingHandler();

        fetch(`/api/users/${userContext.id}/employees/${employeeId}/download`, fetchOptions)
            .then(response => response.blob())
            .then(fileBlob => {
                if(fileBlob.status && fileBlob.status !== 200) throw new Error("Failed to download the file");
                const fileUrl = window.URL.createObjectURL(new Blob([fileBlob]));
                props.stopLoadingHandler();
                setFileState({ fileUrl })
            })
            .catch(error => {
                props.stopLoadingHandler();
                props.openModalHandler(error.message);
            })
    }
    
    return (
        <span>
            <a href={fileState.fileUrl} download ref={downloadLinkRef} style={{display: "none"}}>.</a>
            <Button onClick={getFile} disabled={props.isLoading}>
                Download employee data
            </Button>
            <Spinner size={20} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
        </span>
    )
}

export default withErrorModal(withLoader(EmployeeDownload));