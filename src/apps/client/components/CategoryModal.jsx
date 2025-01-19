import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CategoryModal({
  showModalCategory,
  setShowModalCategory,
  newCategory,
  setNewCategory,
  handleCategory,
  editCategory,
  setEditCategory,
  handleUpdataCategory,
  handleDeleteCategory,
}) {
  return (
    <>
      <Modal
        show={showModalCategory || editCategory}
        onHide={!editCategory ? setShowModalCategory : setEditCategory}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить меню</Modal.Title>
          {editCategory && (
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              color="error"
              onClick={() => handleDeleteCategory()}
            />
          )}
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
            onClick={
              !editCategory
                ? () => setShowModalCategory(!showModalCategory)
                : () => setEditCategory(false)
            }
          >
            Закрыть
          </Button>
          <Button
            type="submit"
            variant="success"
            onClick={!editCategory ? handleCategory : handleUpdataCategory}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
