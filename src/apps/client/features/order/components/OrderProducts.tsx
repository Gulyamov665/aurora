import { FC } from 'react'
import CurrencyFormat from 'react-currency-format'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { OrderProductsProps } from '../types/orderTypes'

const OrderProducts: FC<OrderProductsProps> = ({
  product,
  increase,
  decrease,
}) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center "
      style={{
        borderRadius: '20px',
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#F8FBFF',
      }}
    >
      <div className="d-flex align-items-center">
        <img
          src={product.photo}
          alt="photo"
          width={100}
          height={100}
          style={{ borderRadius: '20px', objectFit: 'cover' }}
        />
        <div className="mx-2">
          <b>{product.name}</b>
          <p>
            <CurrencyFormat
              value={product.price * product.count}
              displayType={'text'}
              thousandSeparator={' '}
              suffix={' Сум'}
            />
          </p>
        </div>
      </div>
      <div className="btn-group bg-white ordersPageBtn">
        <button className={'btn text-danger '} onClick={decrease}>
          <RemoveIcon sx={{ fontSize: 20, color: 'black' }} />
        </button>

        <button className="btn text-black">{product.count}</button>
        <button className="btn text-success" onClick={increase}>
          <AddIcon sx={{ fontSize: 20, color: 'black' }} />
        </button>
      </div>
    </div>
  )
}

export default OrderProducts
