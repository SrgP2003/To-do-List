import { Modal, Button } from "react-bootstrap"
import "../styles/ErrorModal.css"

export default function ErrorModal({ modalTitle, modalBody, show, handleClose }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="error-modal-title">
                    <Modal.Title> <h5>{modalTitle}</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="error-modal-body">
                    {modalBody}
                </Modal.Body>
                <Modal.Footer className="error-modal-footer">
                    <Button className="btn-accept" variant="danger" onClick={handleClose}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}