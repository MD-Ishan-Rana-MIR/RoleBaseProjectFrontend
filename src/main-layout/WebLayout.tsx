import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const WebLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default WebLayout