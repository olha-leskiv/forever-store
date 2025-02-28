import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center border-t">
        <Title text1={'Contact'} text2={'Us'} />
      </div>

      <div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" /> 
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="font-semibold text-gray-600 test-xl">Our Store</p>
          <p className="text-gray-500">54709 Wills Station <br /> Suite 350, Washington,USA</p>
          <p className="text-gray-500">Tel: (415) 555-0132 <br />Email: email@forever.com</p>
          <p className="font-semibold text-gray-600 test-xl">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-black hover:text-white">Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
