import React, {useState, Fragment} from "react";
import Modal from "../components/UI/Modal";

const withErrorModal = PassedComponent => {
    return props => {
        const [modalState, setModalState] = useState({
            isOpen: false,
            message: null
        });
        
        const openHandler = message => setModalState({isOpen: true, message});
        
        const closeHandler = () => setModalState({isOpen: false, message: null});
        
        return (
            <Fragment>
                <Modal open={modalState.isOpen} label="Error" closeLabel="Okay" closeHandler={closeHandler}>
                    {modalState.message}
                </Modal>
                <PassedComponent openModalHandler={openHandler} {...props} />
            </Fragment>
        )
    }
}

export default withErrorModal;