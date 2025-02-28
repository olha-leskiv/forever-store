import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)!;
  const [ productData, setProductData ] = useState<typeof products[0] | null>(null);
  const [ image, setImage ] = useState<string>('');
  const [ size, setSize ] = useState<string>('');

  const fetchProductData = async () => {
    products.map((item: typeof products[0]) => {
      if(item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [ productId, products ])
 
  return productData ? (
    <div className="pt-10 transition-opacity duration-500 border-t-2 opacity-100 easy-in">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">

        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img: string, index: number) => <img src={img} alt='' className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" key={index} onClick={() => setImage(img)}/>)}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt=""/>
          </div>
        </div>

        
          <div className="flex-1">
            <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item: string, index: number) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, size)} className="px-8 py-3 text-sm text-white uppercase bg-black active:bg-gray-700">Add to cart</button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
              <p>100% Original product.</p>
              <p>Cash on deliveryis available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
      </div>

      <div className="mt-20">
        <div className="flex">
            <b className="px-5 py-3 text-sm border">Description</b> 
            <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti delectus voluptatibus rem aliquid quo nihil unde odio recusandae placeat accusantium quam mollitia perferendis, provident hic quibusdam alias! Sequi, porro? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet aspernatur repellendus, expedita cumque praesentium temporibus modi hic dignissimos possimus doloribus libero quos commodi, obcaecati nihil suscipit quis consequatur nulla consectetur?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dolor, nisi itaque nam nulla porro laudantium consequuntur id numquam esse! Veniam dolorem nesciunt quasi sit tenetur laborum, a aperiam perspiciatis.</p>
        </div>

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product
