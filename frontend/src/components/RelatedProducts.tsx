import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

interface Props {
    category: string;
    subCategory: string;
}

const RelatedProducts = ({ category, subCategory }: Props) => {
  const { products } = useContext(ShopContext)!;

  const [ related, setRelated ] = useState<typeof products>([]);

  useEffect(() => {
    if(products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

      setRelated(productsCopy.slice(0, 5))
    }

  }, [products])


  return (
    <div className="mt-24">
      <div className="py-2 text-3xl text-center">
        <Title text1="Related" text2="Products"/>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {related.map((item, index) => <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} key={index}/>)}
        </div>
        
      </div>
    </div>
  )
}

export default RelatedProducts
