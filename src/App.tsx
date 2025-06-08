import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
],
{
    basename: '/zelda-totk-map/' // <--- 加這行！對應到你的 vite.config.ts 中的 base
})

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
