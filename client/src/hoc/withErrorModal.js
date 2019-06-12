import React, {useState, Fragment} from "react";
import Modal from "../components/UI/Modal";

const withErrorModal = PassedComponent => {
    return props => {
        const [modalState, setModalState] = useState({
            isOpen: false,
            message: null,
            wasOpened: false
        });
        
        const openHandler = message => setModalState({isOpen: true, message, wasOpened: true});
        
        const closeHandler = () => setModalState(prevState => ({...prevState, isOpen: false, message: null}));
        
        return (
            <Fragment>
                <Modal open={modalState.isOpen} label="Error" closeLabel="Okay" closeHandler={closeHandler}>
                    {modalState.message}
                </Modal>
                <PassedComponent openModalHandler={openHandler} existError={modalState.wasOpened} {...props} />
            </Fragment>
        )
    }
}

export default withErrorModal;