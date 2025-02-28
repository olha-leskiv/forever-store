import {useState} from 'react'
import { assets } from '../assets/assets';
import axios, { AxiosResponse } from 'axios'
import { AdminLogin } from '../api/user'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

interface Props {
  token: string;
}

const Add = ({ token }: Props ) => {
  const [ image1, setImage1 ] = useState<File | null>(null)
  const [ image2, setImage2 ] = useState<File | null>(null)
  const [ image3, setImage3 ] = useState<File | null>(null)
  const [ image4, setImage4 ] = useState<File | null>(null)
  const [ name, setName ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ price, setPrice ] = useState<string>('0')
  const [ category, setCategory ] = useState<string>('Women')
  const [ subCategory, setSubCategory ] = useState<string>('Topwear')
  const [ sizes, setSizes ] = useState<string[]>([])
  const [ bestseller, setBestseller ] = useState<boolean>(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("category", category)
        formData.append("subCategory", subCategory)
        formData.append("sizes", JSON.stringify(sizes))
        formData.append("bestseller", String(bestseller))
        formData.append("image1", image1 || '')
        formData.append("image1", image2 || '')
        formData.append("image1", image3 || '')
        formData.append("image1", image4 || '')

        const response: AxiosResponse<AdminLogin> = await axios.post(backendUrl + '/api/product/add', formData, {
          headers: { token }
        })

        if(response.data.success) {
            toast.success(response.data.message)
            setName('')
            setDescription('')
            setImage1(null)
            setImage2(null)
            setImage3(null)
            setImage4(null)
            setPrice('')
        } else {
            toast.error(response.data.message)
        }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-start w-full gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className="flex gap-2">
            <label htmlFor='image1' >
                <img className="object-cover w-20 h-20" src={image1 ? URL.createObjectURL(image1 as Blob) : assets.upload_area} alt=''/>
                <input type='file' id="image1" hidden onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setImage4(e.target.files[0]);
    }
  }}/>
            </label>
             <label htmlFor='image2' >
                <img className="object-cover w-20 h-20" src={image2 ? URL.createObjectURL(image2  as Blob) : assets.upload_area} alt=''/>
                <input type='file' id="image2" hidden  onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setImage4(e.target.files[0]);
    }
  }}/>
            </label>
             <label htmlFor='image3' >
                <img className="object-cover w-20 h-20" src={image3 ? URL.createObjectURL(image3  as Blob) : assets.upload_area} alt=''/>
                <input type='file' id="image3" hidden  onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setImage4(e.target.files[0]);
    }
  }}/>
            </label>
             <label htmlFor='image4' >
                <img className="object-cover w-20 h-20" src={image4 ? URL.createObjectURL(image4  as Blob) : assets.upload_area} alt=''/>
                <input type='file' id="image4" hidden   onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setImage4(e.target.files[0]);
    }
  }}/>
            </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' required/>
      </div>

      
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required></textarea>
      </div>

      <div className='flex flex-col w-full gap-2 sm:flex-row sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product subcategory</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25'/>
        </div>
      </div>

      <div className='mb-2'>
        <p>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("Xl") ? prev.filter(item => item !== "Xl") : [...prev, "Xl"])}>
            <p className={`${sizes.includes("Xl") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Xl</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input checked={bestseller} type="checkbox" id="bestseller" onChange={(e) => setBestseller(e.target.checked)}/>
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button  className='py-3 mt-4 text-white bg-black w-28' type='submit'>Add</button>
    </form>
  )
}

export default Add
