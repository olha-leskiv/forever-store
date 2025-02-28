import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { backendUrl } from '../App'
import { AdminLogin } from '../api/user'
import { toast } from 'react-toastify';

interface Props {
    setToken: (token :string) => void;
}

const Login = ({ setToken } : Props) => {
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    
   const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response: AxiosResponse<AdminLogin> = await axios.post(backendUrl + '/api/user/admin', {email, password})
            if(response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='max-w-md px-8 py-6 bg-white rounded-lg shadow-md'>
            <h1 className='mb-4 text-2xl font-bold'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='mb-2 text-sm font-medium text-gray-700'>Email Address</p>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none' type="email" placeholder='your@email.com' required/>
                </div>
                    <div className='mb-3 min-w-72'>
                    <p className='mb-2 text-sm font-medium text-gray-700'>Password</p>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none' type="password" placeholder='Enter your password' required/>
                </div>
                <button className='w-full px-4 py-2 mt-2 text-white bg-black rounded-md cursor-pointer' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
