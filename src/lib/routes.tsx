import { Form } from "../components/Form"
import { Thoughts } from "../components/Thoughts"
import { SingleThought } from "../components/SingleThought"
import { Login } from "../components/Login"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { About } from "../components/About"
// import form from "../form"

export const routes = [  
  {
    path: '/add',
    element: <ProtectedRoute component={<Form />} />,
    name: 'Add'
  },
  {
    path: '/thoughts',
    element: <ProtectedRoute component={<Thoughts />} />,
    name: 'Thoughts',
  },
  {
    path: '/thoughts/:id',
    element: <SingleThought />,
    name: 'Details',
    hidden: true,
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
    hidden: true,
  },
  {
    path: '/',
    element: <About />,
    name: 'About',
    hidden: true,
  }
]
