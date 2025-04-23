import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserRegister from "./Pages/UserRegister"
import UserLogin from "./Pages/UserLogin"
import CaptainRegister from "./Pages/CaptainRegister"
import CaptainLogin from "./Pages/CaptainLogin"
import CaptainHome from "./Pages/CaptainHome"
import Home from "./Pages/Home"
import UserHome from './Pages/UserHome'
import { useDispatch } from 'react-redux'
import { isLocalToState } from "./Reducers/UserReducer"
import { CaptainisLocalToState } from "./Reducers/CaptainReducer"
import Riding from './Pages/Riding'
import CaptainRide from './Components/CaptainRide'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLocalToState())
    dispatch(CaptainisLocalToState())
  }, [])


  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/user-register",
        element: <UserRegister />

      },
      {
        path: "/user-login",
        element: <UserLogin />
      },
      {
        path: "/captain-register",
        element: <CaptainRegister />
      },
      {
        path: "/captain-login",
        element: <CaptainLogin />
      },
      {
        path: "/user-home",
        element: <UserHome />
      },
      {
        path: "/captain-home",
        element: <CaptainHome />
      },
      {
        path: "/riding",
        element: <Riding />
      },
      {
        path: "*",
        element: <h1>Page not found</h1>  // Default page not found component
      },
      {
        path: "/captain-riding",
        element: <CaptainRide />
      }
    ]
  )


  return (
    <RouterProvider router={router} />
  )
}

export default App
