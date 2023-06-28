import { useState, useEffect } from "react";
import BSModal from "react-bootstrap/Modal";

export default function Modal({isShown, onClose, title, children}) {
  const [show, setShow] = useState(isShown);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  useEffect(() => {
    setShow(isShown);
  }, [isShown]);

  return (
    <>
      <BSModal show={show} onHide={handleClose}>
        <BSModal.Header closeButton>
          <BSModal.Title>{title}</BSModal.Title>
        </BSModal.Header>
        <BSModal.Body>
          {children}
        </BSModal.Body>
      </BSModal>
    </>
  );
}
