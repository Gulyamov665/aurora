import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function PromoModal({
  show,
  setShow,
  handleSubmit,
  register,
  submit,
}) {
  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить акцию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                placeholder="Пропишите название акции"
                {...register('name', { required: true })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Пропишите условия акции"
                rows={3}
                {...register('info', { required: true })}
                defaultValue={'test'}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Изображение</Form.Label>

              <Form.Control
                type="file"
                accept="image"
                autoFocus
                {...register('photo')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                placeholder="Пропишите цену акции"
                {...register('price', { required: true })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleSubmit(submit)}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
