import 'antd/dist/antd.css'

import './styles/main.scss'
import UserContext from './context/UserContext'
import Routes from './routes'

export default function App() {

  return (
    <UserContext>
      <Routes />
    </UserContext>
  )
}
