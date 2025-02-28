import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

interface Props {
  token: string;
}

const List = ({token}: Props) => {
  
  const [ list, setList ] = useState([])
  
  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
          setList(response.data.collection);
        } else {
          toast.error(response.data.message)
        }
    } catch (error) {
      console.log(error)
    }
  }

  const removeProduct = async (id: string) => {
    try {
       const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token }} )
        if (response.data.success) {
           toast.success(response.data.message)
           await fetchList()
          }
            else {
              toast.error(response.data.message)
            }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2'>

    <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-small'>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>

    {list && list.map((item, index) => {
      return <div className='grid grid-cols-[1fr_3fr-1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 text-small' key={index}>
        <img className="w-12" src={item.image[0]} alt="" />
        <p>{item.name}</p>
        <p>{item.category}</p>
        <p>{item.currency}{item.price}</p>
        <p onClick={()=> removeProduct(item._id)} className='text-right cursor-pointer md:text-center'>X</p>
      </div>
      })
    }
  </div>

      
    </>
  )
}

export default List
