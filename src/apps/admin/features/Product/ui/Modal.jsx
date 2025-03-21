// import { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import { toast } from 'react-toastify'

// function StaticModal({ children, title, trigger, setImg, cropData }) {
//   const [show, setShow] = useState(false)

//   // trigger product image
//   useEffect(() => {
//     if (trigger) {
//       setShow(true)
//     }
//   }, [trigger])

//   //Проверяем не пустой ли state cropData
//   const handleClose = () => {
//     if (!cropData) return toast.error('Не указан размер изображения')
//     setShow(false)
//     setImg(trigger)
//   }

//   // очищаем state картинки после нажатия кнопки отмены в модальном окне
//   const cleanImgState = () => {
//     if (trigger) {
//       setImg(null)
//       }
//     setShow(false)
//   }

//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={cleanImgState}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{children}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cleanImgState}>
//             Закрыть
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Coхранить
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export { StaticModal }
