import React from 'react'
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenu'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import NavbarBottom from '../components/NavbarBottom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NavbarBottomPage() {
  const { res } = useParams()
  const { items } = useSelector((state) => state.cart)

  const venUrl = import.meta.env.VITE_VENDOR_URL

  const options = { fontSize: 30 }

  const icons = [
    {
      icon: <RestaurantMenuOutlinedIcon sx={options} />,
      title: 'Меню',
      link: '..',
    },
    {
      icon: <ShoppingCartOutlinedIcon sx={options} />,
      title: 'Корзина',
      link: `cart`,
      counter: items.length,
    },
    {
      icon: <DeliveryDiningOutlinedIcon sx={options} />,
      title: 'Заказы',
      link: `orders`,
    },
    {
      icon: <AssignmentIndOutlinedIcon sx={options} />,
      title: 'Профиль',
      link: `profile`,
    },
  ]
  return (
    <div>
      <NavbarBottom icons={icons} />
    </div>
  )
}
