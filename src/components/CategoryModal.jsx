import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function CategoryModal({
  showModalCategory,
  setShowModalCategory,
  newCategory,
  setNewCategory,
  handleCategory,
}) {
  return (
    <>
      <Modal show={showModalCategory} onHide={setShowModalCategory}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить меню</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowModalCategory(!showModalCategory)}
          >
            Закрыть
          </Button>
          <Button type="submit" variant="success" onClick={handleCategory}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
