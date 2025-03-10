import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem"
import Title from "./Title"

const BestSeller = () => {
    const { products } = useContext(ShopContext)!
    const [ bestSellers, setBestSellers ] = useState<typeof products>([])

    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestseller);
        setBestSellers(bestProducts.slice(0, 10))
    }, [products])

  return (
    <div className="my-10">
        <div className="py-8 text-3xl text-center">
            <Title text1="Best" text2="Sellers"/>
            <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
            {bestSellers.map((item) => <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} key={item._id}/>)}
        </div>
    </div>
  )
}

export default BestSeller
