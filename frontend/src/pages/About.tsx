import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const About = () => {
  return (
    <div>
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1="About" text2="US" />
      </div>
      <div className="flex flex-col gap-16 my-10 md:flex-row">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt='' />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum omnis dolorum earum eos, eum eligendi iusto amet rem praesentium autem tempora libero maxime necessitatibus dolores exercitationem laboriosam. Nostrum, voluptatibus commodi.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut error, ad repudiandae, doloremque consequuntur illum nam accusantium ullam recusandae perferendis magni magnam deleniti. Placeat, voluptatum? Ut ab consectetur impedit?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis! Repellat quod minima tempore ea. Debitis odit optio asperiores quod porro, nam maxime est, quos totam accusantium magni, impedit laboriosam.</p>
      </div>
      </div>
      <div className="py-4 text-4xl">
        <Title text1="Why" text2="Choose us"/>
      </div>

      <div className="flex flex-col mb-20 text-sm md:flex-row">
          <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
              <b>Quality Assurance:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum maiores porro quisquam voluptatem commodi esse, eveniet ea eius. Dolorum voluptatem maxime deserunt earum ex nam reprehenderit rerum modi sint sapiente.  </p>
          </div>
          <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
              <b>Convenience:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum maiores porro quisquam voluptatem commodi esse, eveniet ea eius. Dolorum voluptatem maxime deserunt earum ex nam reprehenderit rerum modi sint sapiente.  </p>
          </div>
          <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
              <b>Exceptional Custoer Service:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum maiores porro quisquam voluptatem commodi esse, eveniet ea eius. Dolorum voluptatem maxime deserunt earum ex nam reprehenderit rerum modi sint sapiente.  </p>
          </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
