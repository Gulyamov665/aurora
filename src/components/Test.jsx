import Intro from './Intro'
import { Outlet } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import Header from './Header'
import Footer from './Footer'

function Test() {
  const { restData: pos } = useAxios('restaurant')

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        {Object.keys(pos).length > 0 && (
          <Intro
            name={pos.name}
            location={pos.adress}
            img={pos.photo}
            logo={pos.logo}
          />
        )}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Test
