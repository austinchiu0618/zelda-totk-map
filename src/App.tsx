import * as React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Map from '@/pages/Map'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
