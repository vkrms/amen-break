import { Route, Routes } from 'react-router-dom'
import './App.css'

import Form from './components/Form'
import {Thoughts} from './components/Thoughts'
import { OneThought } from './components/OneThought'
import { Login } from './components/Login'
import form from './form'

const routes = [  
  {
    path: '/',
    element: <Form form={form} />,
  },
  {
    path: '/thoughts',
    element: <Thoughts />,
  },
  {
    path: '/thoughts/:id',
    element: <OneThought />,
  },
  {
    path: '/login',
    element: <Login/>,
  }
]

function App() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  )
}

export default App
