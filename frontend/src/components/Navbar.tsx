import { useState, useContext } from 'react'

import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from "../context/ShopContext"

const Navbar = () => {
     const { showSearch, setShowSearch, getCartCount, setToken, setCartItems, navigate, token} = useContext(ShopContext)!
  

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
      navigate("/login")
    } 

    const [isVisible, setIsVisible] = useState<boolean>()
    const navs = [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'Collection',
            route: '/collection'
        },
        {
            label: 'About',
            route: '/about'
        },
        {
            label: 'Contact',
            route: '/contact'
        },
    ]

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'><img src={assets.logo} alt='Logo' className='w-36'/></Link>
      <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
        {navs.map((nav) => <NavLink to={nav.route} className='flex flex-col items-center gap-1 uppercase' key={nav.label}>
            <p>{nav.label}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 uppercase hidden'/>
        </NavLink>)
        }
      </ul>
      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt='' onClick={() => setShowSearch(!showSearch)}/>
        <div className='relative group'>
            <img onClick={() => token ? null : navigate("/login")} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''/>
            <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                  {token && <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p onClick={() => navigate("/orders")} className='cursor-pointer hover:text-black'>Orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>}

                
            </div>
        </div>
        <Link to='/cart' className='relative'>
             <img src={assets.cart_icon} className='w-5 min-w-5' alt=''/>
             <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img src={assets.menu_icon} onClick={() => setIsVisible(true)} className='w-5 cursor-pointer sm:hidden' alt=''/>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${isVisible ? 'w-full': 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
            <div onClick={() => setIsVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=''/>
                <p>Back</p>
            </div>
         {navs.map((nav) => <NavLink to={nav.route} onClick={() => setIsVisible(false)} className='py-2 pl-6 uppercase border' key={nav.label}>
            <p>{nav.label}</p>
        </NavLink>)
        }
        </div>

      </div>
    </div>
  )
}

export default Navbar
