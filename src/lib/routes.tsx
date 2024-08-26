import Form from "../components/Form"
import { Thoughts } from "../components/Thoughts"
import { OneThought } from "../components/OneThought"
import { Login } from "../components/Login"
import { ProtectedRoute } from "../components/ProtectedRoute"
import form from "../form"

export const routes = [
  {
    path: '/',
    element: <ProtectedRoute component={<Form form={form} />} />,
    name: 'Add'
  },
  {
    path: '/thoughts',
    element: <ProtectedRoute component={<Thoughts />} />,
    name: 'Thoughts',
  },
  {
    path: '/thoughts/:id',
    element: <OneThought />,
    name: 'Details',
    hidden: true,
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
  }
]