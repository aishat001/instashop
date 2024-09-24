import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  bg-gray-50 px-[20px] w-full h-full ">
    <div className="flex flex-col items-center justify-center ">

      {/* Welcome Illustration */}
      <div className="max-w-[296px]  pt-[48px]">
        <Image
          src="/images/welcome.svg" // Replace with your image path
          alt="Welcome"
          width={296}
          height={210}
  
        />
      </div>

      {/* Welcome Text */}
      <h1 className="text-[36px] font-[700] mt-[25px]">Welcome</h1>
      <p className="text-center text-black mt-[8px font-[400]">
        The safest platform to shop from social media vendors
      </p>

      {/* Features List */}
      <div className="bg-[#FFEAFA] border border-[#8A226F] mt-[25px] p-4 rounded-lg w-full max-w-md mb-[25px]">
        <ul className="space-y-2 text-black">
          {
          ['Reach Millions of Shoppers', 'Easy Product Listing', 'Secure and Fast Payments', 'Boost Your Visibility'].map((feature) => (
            <li key={feature} className="flex flex-row gap-2"><Image src={'/images/check.svg'} alt="check" width={20} height={20}/> {feature}</li>

          ))
        }
        </ul>
      </div>
      </div>

      {/* Get Started Button */}
      <div className="mt-auto w-full mt-10  pb-[40px]">
      <Link
        href="/get-started"
        className="mt-auto bg-purple text-white w-full text-center py-3 px-6 text-center justify-center rounded-full flex "
        style={{ boxShadow: '4px 8px 24px 0px #FE2C5533' }}
        >
        Get started
      </Link>
      </div>
    
    </div>
  );
}

// Add this export to enable static site generation
export const dynamic = 'force-static';
