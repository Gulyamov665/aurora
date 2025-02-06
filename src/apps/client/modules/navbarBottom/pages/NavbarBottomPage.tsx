import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenu'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import NavbarBottom from '../components/NavbarBottom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { IconItem } from '../interfaces/interface'

export default function NavbarBottomPage() {
  const { items } = useSelector((state: RootState) => state.cart)

  const options = { fontSize: 30 }

  const icons: IconItem[] = [
    {
      icon: <RestaurantMenuOutlinedIcon sx={options} />,
      title: 'Меню',
      link: '..',
    },
    {
      icon: <ShoppingCartOutlinedIcon sx={options} />,
      title: 'Корзина',
      link: 'cart',
      counter: items.length,
    },
    {
      icon: <DeliveryDiningOutlinedIcon sx={options} />,
      title: 'Заказы',
      link: 'orders',
    },
    {
      icon: <AssignmentIndOutlinedIcon sx={options} />,
      title: 'Профиль',
      link: 'profile',
    },
  ]

  return (
    <div>
      <NavbarBottom icons={icons} />
    </div>
  )
}
