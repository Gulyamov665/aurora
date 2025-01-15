// import React, { useRef } from 'react'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'
// import useInput from '../../../hooks/useInput'
// import DeleteIcon from '@mui/icons-material/Delete'
// import { useSelector } from 'react-redux'
// import {
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from '../../../store/admin/productsApi'
// import { toast } from 'react-toastify'
// import { useState } from 'react'

// function MenuModal({ restaurant, updatedItem, close }) {
//   const { createModal, updateModal, selectedCategory } = useSelector(
//     (state) => state.modals
//   )
//   const [addProduct, { isLoading }] = useAddProductMutation()
//   const [updateProduct, { isLoading: UpdateLoading }] =
//     useUpdateProductMutation()
//   const [deleteProduct] = useDeleteProductMutation()
//   const { data, handleChange, formData } = useInput(
//     restaurant,
//     selectedCategory,
//     updatedItem
//   )
//   const cropperRef = useRef(null)
//   const [cropData, setCropData] = useState(null)
//   const [img, setImg] = useState(null)

//   const handleFileChange = (e) => {
//     handleChange(e)

//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = () => {
//         setImg(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const onCrop = () => {
//     const cropper = cropperRef.current?.cropper
//     const cData = cropper.getData(true)
//     setCropData(cData)
//     console.log(cropData)
//   }
//   const handleSubmitCategory = async () => {
//     formData.append('crop', JSON.stringify(cropData))
//     await addProduct(formData).unwrap()
//     close()
//     toast.success('Позиция добавлена')
//   }

//   const handleUpdateMenu = async () => {
//     formData.append('crop', JSON.stringify(cropData))
//     await updateProduct({
//       body: formData,
//       updatedItem: updatedItem.id,
//     }).unwrap()
//     close()
//     toast.success('Позиция изменена')
//   }

//   const handledelete = async () => {
//     await deleteProduct({ id: updatedItem.id })
//     close()
//     toast.error('Позиция удалена')
//   }

//   return (
//     <>
//       <Modal show={createModal ? createModal : updateModal} onHide={close}>
//         <Modal.Header closeButton>
//           {createModal ? (
//             <Modal.Title>Добавить меню</Modal.Title>
//           ) : (
//             <div>
//               <Modal.Title>Изменить меню</Modal.Title>
//             </div>
//           )}
//           {updateModal && (
//             <DeleteIcon
//               style={{ cursor: 'pointer' }}
//               color="error"
//               onClick={() => handledelete()}
//             />
//           )}
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Название</Form.Label>
//               <Form.Control
//                 type="text"
//                 autoFocus
//                 name="name"
//                 value={data.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Описание</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 value={data.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Цена</Form.Label>
//               <Form.Control
//                 type="number"
//                 autoFocus
//                 name="price"
//                 value={data.price}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Изображение</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="photo"
//                 autoFocus
//                 // onChange={handleChange}
//                 onChange={handleFileChange}
//               />
//               {/* <CropJs src={img} cropperRef={cropperRef} onCrop={onCrop} /> */}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={close}>
//             Закрыть
//           </Button>
//           <Button
//             variant="success"
//             onClick={createModal ? handleSubmitCategory : handleUpdateMenu}
//             className={isLoading && 'disabled'}
//           >
//             {isLoading || UpdateLoading ? (
//               <span
//                 className="spinner-border spinner-border-sm"
//                 aria-hidden="true"
//               ></span>
//             ) : (
//               'Сохранить'
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default MenuModal
