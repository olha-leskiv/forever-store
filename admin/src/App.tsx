import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {
  const [ token, setToken ] = useState<string>(localStorage.getItem("token") || '')

  useEffect(() => {
    if(!token) return;

    localStorage.setItem("token", token)
  }, [token])

  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer />
      {token === '' 
      ? <Login setToken={setToken}/>
      :  
      <>
      <Navbar setToken={setToken}/>
      <hr className='border-gray-300' />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-base'>
          <Routes >
            <Route path='/add' element={<Add token={token} />}/>
            <Route path='/list' element={<List token={token}/>}/>
            <Route path='/orders' element={<Orders token={token}/>}/>
          </Routes>
        </div>
      </div>
      </>
      }
     
    </div>
  )
}

export default App
