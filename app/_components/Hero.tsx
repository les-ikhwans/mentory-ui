import Image from "next/image"
import Button from "./Button"
const Hero = () => {
  return (
    // <section className='max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row border-2 border-red-500 '>

    // </section>
    <div className="bg-white">
    
   <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />
    <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
      
    <h1 className="text-4xl font-bold lg:text-7xl">Connect now</h1>
<h1 className="text-4xl font-bold lg:text-7xl">With top experts</h1>
<p className="text-base mt-6 text-gray-500 xl:max-w-[520px]">
    Explore new possibilities with our mentorship platform. Let our community of experts guide you through your journey, unlocking your full potential.
</p>


        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image 
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            198k
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p>
           <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button 
            type="button" 
            title="start Now" 
            variant="btn_green" 
          />
          <Button 
            type="button" 
            title="How we work?" 
            icon="/play.svg"
            variant="btn_white_text" 
          /></div>
        </div>
        </div>
        
    </section>
</div>

  )
}

export default Hero
