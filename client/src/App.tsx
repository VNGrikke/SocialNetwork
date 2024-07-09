import React from 'react'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'
import Error from './components/error/Error'
import Home from './pages/home/Home'
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </>
  )
}
