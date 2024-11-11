import Image from 'next/image'
import React from 'react'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          How ReferLoop Works
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Guide to Maximizing Your Referrals</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">With ReferLoop, you can easily share your credit card referral links and earn bonuses. Our platform connects you with potential applicants, tracks your referrals, and helps you maximize your rewards. Whether you're a seasoned credit card enthusiast or just getting started, ReferLoop makes it simple to boost your earnings.</p>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        <Image 
          src="/img-3.png"
          alt="credit cards"
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
          <div className="flexBetween flex-col">
            <div className='flex w-full flex-col'>
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Referral Progress</p>
                <p className="bold-16 text-green-50">4 of 5</p>
              </div>
              <p className="bold-20 mt-2">Chase Sapphire Preferred</p>
            </div>

            <div className='flex w-full flex-col'>
              <p className="regular-16 text-gray-20">Bonus</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">$200 per referral</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide