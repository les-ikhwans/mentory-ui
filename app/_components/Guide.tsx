import Image from 'next/image'
import React from 'react'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <Image src="/small.png" alt="camp" width={50} height={50}  className='mt-12'/>
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          We are here for you
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Guide You to Easy Path</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">At <span className='text-green-500 font-bold'>Mentory</span>, our mission is to be your trusted compass in navigating the complexities of your journey. Whether you're embarking on a career transition, seeking personal growth, or striving for academic excellence, we are dedicated to providing you with the guidance, resources, and support needed to steer you towards success. With a community of experienced mentors and a wealth of valuable insights, we are here to illuminate your path and empower you to reach your fullest potential."</p>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        <Image 
          src="/guide.png"
          alt="boat"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        />

        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image 
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
<div className="flex flex-col">
  <div className="flex w-full flex-col">
    <div className="flex w-full">
      <p className="text-gray-500">Mentorship Focus</p>
      <p className="text-green-500 font-bold">Career Growth</p>
    </div>
    <p className="font-bold mt-2 text-xl">Personalized Mentorship</p>
  </div>

  <div className="flex w-full flex-col mt-6">
    <p className="text-gray-500">Expertise Level</p>
    <h4 className="font-bold mt-2">Advanced</h4>
  </div>
</div>

        </div>
      </div>
    </section>
  )
}

export default Guide