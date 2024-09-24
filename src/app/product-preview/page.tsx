'use client';

import Button from '@/components/Button';
import { useAppStore } from '@/store.ts/useStore';
import { calculateDiscountPercentage } from '@/utils/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductPreview() {
  const router = useRouter();
  const { store, product } = useAppStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    description: true,
    vendor: true,
  });
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length); // Cycle to the next image
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length); // Cycle to the previous image
  };

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex flex-col  bg-white w-full ">
      {/* Back button */}

      <div className="w-full  flex flex-row justify-between items-center  gap-[20px] px-[20px]">
        <button className="text-black text-[16px] py-[9px] text-start flex flex-row items-center gap-[12px] font-[600]" onClick={() => router.back()}>
          <Image src="/images/arrow-back.svg" alt="Arrow back" width={12} height={12} />
          Product Preview
        </button>

        <img src="/images/more_vert.svg" alt="more" />
      </div>

      <div className="w-full  min-h-[360px] relative">
        <img
          src={product?.images[currentImageIndex]?.url || '/images/product-image.svg'} // Use current image index
          alt={`Product Image ${currentImageIndex + 1}`}
          className="rounded-lg w-full"
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        >
          →
        </button>
      </div>


      {/* Product Info */}
      <div className="w-full px-[20px] mt-6 mb-6">
        <h1 className="text-lg font-bold">{product?.title}</h1>
        <div className="flex items-center mt-2 w-full">
          <span className="text-[20px] font-semibold">₦{product?.price}</span>
          <span className="ml-2 text-gray-400 line-through text-[10px">₦{product?.oldPrice}</span>
          <span className="ml-2 text-white rounded-full bg-purple px-3 text-[10px]">{calculateDiscountPercentage(product?.oldPrice, product?.price)}% OFF</span>
          <div className="flex items-center s ml-auto">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-600 text-sm">(5 sold)</span>
          </div>
        </div>

      </div>

      <hr />

      {/* Variants Section */}
      <div className="w-full px-[20px] mt-6 mb-6">
        <h2 className="text-md font-semibold">Select variants</h2>

        {product?.variations?.map((variant: any, index: number) => (
          <div key={index} className="mt-4">
            <h3 className="text-[10px] font-medium">{variant.name}:</h3>
            <div className="flex mt-2 space-x-2">
              {variant?.values?.map((option: string, optionIndex: number) => (
                <button key={optionIndex} className="px-4 h-[22px] text-[12px] bg-[#00000008] rounded-full">
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* Product Description */}
      <div className="w-full px-[20px] mt-6">
        <h2 className="w-full flex items-center text-[14px] font-bold mb-4">Product description
          <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.description && 'rotate-[180deg'} `} onClick={() => toggleSection('description')} />

        </h2>

        {visibleSections.description &&
          <div className=" p-4 rounded-lg">
            <p className="text-[12px] mt-2 text-gray-700">
              Wholesale and drop shipping are both welcomed. For wholesale, we will offer discount or free express shipping, which only takes 3-7 days to arrive.
            </p>
            <button className="mt-2 text-purple text-[12px]">Read more</button>
          </div>}
      </div>

      <hr />

      {/* Vendor Info */}
      <div className="w-full px-[20px] mt-6 mb-6">

        <h2 className="w-full flex items-center text-[14px] font-bold mb-4">About this vendor
          <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.vendor && 'rotate-[180deg'} `} onClick={() => toggleSection('vendor')} />

        </h2>

        {visibleSections.vendor &&
          <div className=" p-4 rounded-lg">
            <div className="flex items-center mt-2">
              <img
                src={store?.logo} // Replace with vendor image source
                alt="Vendor"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-bold text-sm">Gucci Store</h3>
                <p className="text-gray-500 text-sm">Fashion · 5.4 · 100k followers</p>
              </div>

              <div className='text-purple text-lg ml-auto font-semibold'>Follow</div>
            </div>
            <p className="text-sm mt-2 text-gray-700">
              Vendor description: You can track your parcel on the following website using your tracking number: www.17track.com...
            </p>


            <div className='flex flex-wrap gap-3 mt-3'>
              {product?.collections?.map((col, index) => (
                <div key={index} className='bg-gray-200 rounded-full px-3 py-1 text-[12px]'>
                  {col}
                </div>
              ))}
            </div>
          </div>
        }
      </div>

<hr/>
      {/* Publish Button */}
      <div className="w-full px-[20px] mt-auto pt-8">
        <Button onClick={() => { }}>Publish</Button>
      </div>
    </div >
  );
}
