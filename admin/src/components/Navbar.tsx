import { assets } from '../assets/assets'

interface Props {
    setToken: (token :string) => void;
}

const Navbar = ({ setToken }: Props) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={() => setToken('')} className='px-5 py-2 text-white bg-gray-600 rounded-full cursor-pointer sm:px-7 sm:py-2 hover:bg-gray-700'>Logout</button>
    </div>
  )
}

export default Navbar
