import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import DeleteIcon from '@mui/icons-material/Delete'

import { toast } from 'react-toastify'

function ProductForm() {
  return (
    <>
      <Modal
        show={'createModal' ? 'createModal' : 'updateModal'}
        onHide={close}
      >
        <Modal.Header closeButton>
          {createModal ? (
            <Modal.Title>Добавить меню</Modal.Title>
          ) : (
            <div>
              <Modal.Title>Изменить меню</Modal.Title>
            </div>
          )}
          {updateModal && (
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              color="error"
              onClick={() => handledelete()}
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
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                name="price"
                value={data.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={close}>
            Закрыть
          </Button>
          <Button
            variant="success"
            onClick={createModal ? handleSubmitCategory : handleUpdateMenu}
            className={isLoading && 'disabled'}
          >
            {isLoading || UpdateLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            ) : (
              'Сохранить'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductForm
