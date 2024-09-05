import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { routes } from './lib/routes'
import './App.css'

function App() {
  return (
    <>
      <Header/>

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </>
  )
}

export default App
