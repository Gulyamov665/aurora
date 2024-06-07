import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function StaticModal({ children, title, trigger }) {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (trigger) {
      setShow(true)
    }
  }, [trigger])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Coхранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { StaticModal }
