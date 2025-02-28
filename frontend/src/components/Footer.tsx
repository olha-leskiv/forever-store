import { assets } from "../assets/assets"
import { PHONE_NUMBER, CONTACT_EMAIL } from"../constants/constants"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <img src={assets.logo} className="w-32 mb-5" alt=""/>
            <p className="w-full text-gray-600 md:w-2/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate asperiores deleniti, non eligendi maiores odit amet accusantium veniam, quidem vitae sint ut quia optio laborum facilis quisquam neque atque sequi?
            </p>
        </div>

        <div>
            <p className="mb-5 text-xl font-medium upercase">Company</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className="mb-5 text-xl font-medium uppercase">Get in touch</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>{PHONE_NUMBER}</li>
                <li>{CONTACT_EMAIL}</li>
            </ul>
        </div>
 
      </div>
       <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2024@ forever.com - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
