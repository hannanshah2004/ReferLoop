import Image from 'next/image'
import Button from './Button'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <h1 className="bold-52 lg:bold-88">ReferLoop: Share & Earn</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Join the revolution in credit card referrals. ReferLoop connects you with a community of cardholders, allowing you to share referral bonuses and maximize your rewards. Start your journey to smarter credit card benefits today!
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
            <span className="regular-16 lg:regular-20 ml-1">Our Users</span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button 
            type="button" 
            title="Get Started" 
            variant="solid" 
          />
        </div>
      </div>

      <div className="relative flex flex-1 items-start justify-center">
  <div className="relative z-20 w-full max-w-[1200px] bg-white px-8 py-10 mt-10">
    <div className="flex justify-center">
      <Image
        src="/img-4.png"  
        alt="Your Referrals"
        width={1000}  
        height={1000} 
      />
    </div>
  </div>
</div>
    </section>
  )
}

export default Hero
