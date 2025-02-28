import { useState, useContext, useEffect, useCallback } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"
import { Product } from '../types/types'


const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)!
  const [ showFilter, setShowFilter ] = useState<boolean>(false)
  const [ filterProducts, setFilterProducts ] = useState<typeof products>([])
  const [ category, setCategory ] = useState<string[]>([])
  const [ subCategory, setSubCategory ] = useState<string[]>([])
  const [ sortType, setSortType ] = useState<string>('relevant')

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value))
    } else {
      setCategory(prev => [...prev,value])
    }
  }

    const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value))
    } else {
      setSubCategory(prev => [...prev,value])
    }
  }

  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if(showSearch && search) {
      productsCopy = productsCopy.filter((item: Product) => item.name.toLocaleLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item: Product) => category.includes(item.category));
    }

      if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item: Product) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }, [category, products, subCategory, search, showSearch]);

  const sortProduct = useCallback(() => {

    const fpCopy = filterProducts.slice();

    switch (sortType) {
        case "high-low":
          setFilterProducts(fpCopy.sort((a: typeof products[0], b: typeof products[0]) => (b.price - a.price)));
          break
        case "low-high": 
          setFilterProducts(fpCopy.sort((a: typeof products[0], b: typeof products[0]) => (a.price - b.price)));
          break
        default:
          applyFilter()
    }
  }, [sortType, applyFilter, filterProducts])

  useEffect(() => {
      applyFilter();
  }, [category, subCategory, applyFilter, search, showSearch, products])

  useEffect(()=> {
    sortProduct()
  }, [sortType])


  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">

      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 my-2 text-xl uppercase cursor-pointer">Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon}/>
        </p>
        <FilterSection
          title="Categories"
          options={["Men", "Women", "Kids"]}
          showFilter={showFilter}
          onChange={toggleCategory}
        />
        <FilterSection
          title="Type"
          options={["Topwear", "Bottomwear", "Winterwear"]}
          showFilter={showFilter}
          onChange={toggleSubCategory}
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1="All" text2="Collections" />
          <select className="px-2 text-sm border-2 border-gray-300" onChange={(e) => setSortType(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item: Product, index: number) => <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>)}
        </div>
      </div>


    </div>
  )
}

export default Collection

interface FilterSectionProps {
  title: string;
  options: string[];
  showFilter: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterSection = ({ title, options, showFilter, onChange }: FilterSectionProps) => (
  <div
    className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
  >
    <p className="mb-3 text-sm font-medium uppercase">{title}</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input type="checkbox" className="w-3" value={option} onChange={onChange} />
          {option}
        </label>
      ))}
    </div>
  </div>
);
