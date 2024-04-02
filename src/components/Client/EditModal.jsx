// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'

// function EditModal({ setModalShow, modalShow, item }) {
//   return (
//     <>
//       <Modal show={modalShow} onHide={setModalShow}>
//         <Modal.Header closeButton>
//           <Modal.Title>Добавить меню</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Название</Form.Label>
//               <Form.Control type="text" autoFocus value={item.name} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Описание</Form.Label>
//               <Form.Control as="textarea" rows={3} value={item.description} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Цена</Form.Label>
//               <Form.Control type="number" autoFocus value={item.price} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Изображение</Form.Label>
//               <Form.Control type="file" autoFocus />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={() => setModalShow(!modalShow)}>
//             Закрыть
//           </Button>
//           <Button
//             type="submit"
//             variant="success"
//             // onClick={handleSubmitCategory}
//           >
//             Сохранить
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default EditModal
