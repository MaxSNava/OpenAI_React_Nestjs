import { RouterProvider } from 'react-router-dom'
import { router } from './presentation/routes/router'

export default function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}
