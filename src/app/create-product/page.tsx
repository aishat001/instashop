'use client';

import { useAppStore } from '@/store.ts/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import InputField from '@/components/InputField'; // Import the reusable input component
import Toggle from '@/components/Toggle';
import CollectionComponent from '@/components/CollectionInput';

export default function CreateProduct() {
  const router = useRouter();
  const { products, product, setProduct, initializeVariantDetails, updateVariantDetails, addProduct } = useAppStore();
  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null);
  const [isVariableProduct, setIsVariableProduct] = useState(true);
  const [newCollection, setNewCollection] = useState(''); // State for new collection input
  const [visibleSections, setVisibleSections] = useState({
    basicDetails: true,
    productImages: true,
    inventoryVariations: true,
    variants: false,
    shipping: true,
  });

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddOption = () => {
    setProduct({
      ...product,
      variations: [
        ...product.variations,
        { option: "Option " + (product.variations.length + 1), name: "", values: [] },
      ],
    });
  };

  // Handle Option Name Change
  const handleOptionNameChange = (index: number, newName: string) => {
    const updatedVariations = product.variations.map((variation, idx) => {
      if (idx === index) {
        return { ...variation, name: newName };
      }
      return variation;
    });
    setProduct({
      ...product,
      variations: updatedVariations
    });
  };

  const handleAddValue = (index: number, newValue: string) => {
    const updatedVariations = product?.variations.map((variation, idx) => {
      if (idx === index && newValue.trim() !== "") {
        return {
          ...variation,
          values: [...variation.values, newValue],
        };
      }
      return variation;
    });
    setProduct({
      ...product,
      variations: updatedVariations
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Enter") {
      handleAddValue(index, (event.target as HTMLInputElement).value);
      (event.target as HTMLInputElement).value = ""; // Clear input after adding
    }
  };

  const handleRemoveValue = (optionIndex: number, valueIndex: any) => {
    const updatedVariations = product?.variations.map((variation, idx) => {
      if (idx === optionIndex) {
        return {
          ...variation,
          values: variation.values.filter((_: any, vIdx: any) => vIdx !== valueIndex),
        };
      }
      return variation;
    });
    setProduct({
      ...product,
      variations: updatedVariations
    });
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        url: URL.createObjectURL(file),
        name: `image${product.images.length + index + 1}`,
        toggle: false
      }));
      setProduct({
        ...product,
        images: [...product.images, ...newImages]
      });
    }
  };

  const handleImageToggleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { checked } = e.target;
    const updatedImages = [...product.images];
    updatedImages[index].toggle = checked;

    setProduct({
      ...product,
      images: updatedImages
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  }

  const [openDropdownIdx, setOpenDropdownIdx] = useState(1);
  const handleRemoveOption = (optionIdx: number) => {
    setProduct({
      ...product,
      variations: product.variations.filter((_, idx) => idx !== optionIdx)
    })
    setOpenDropdownIdx(-1);
  };

  useEffect(() => {
    initializeVariantDetails(); // Initialize variant details based on variations
  }, [product.variations]);

  const handleVariantDetailChange = (index: number, field: string, value: string) => {
    updateVariantDetails(index, field, value);
  };

  return (
    <div className="flex flex-col  flex-1 w-full">
      {/* Step Indicator */}
      <div className="w-full  flex flex-row justify-between items-center gap-[20px] px-[20px]">
        <button className="text-black text-[16px] py-[9px] text-start flex flex-row items-center gap-[12px] font-[600]" onClick={() => router.back()}>
          <Image src="/images/arrow-back.svg" alt="Arrow back" width={12} height={12} />
          Product details
        </button>

        <img src="/images/more_vert.svg" alt="more" />
      </div>

      {/* Draft/Preview */}
      <div className="flex px-[20px] justify-between items-center mb-4 mt-[5px]">
        <span className="border text-gray-600 px-3 py-1 rounded-full text-sm flex flex-row items-center gap-2">Draft <img src="/images/mark.svg" alt="" /></span>

        <button className="text-purple text-[12px]"
          onClick={() => {
            addProduct(product)
            router.push('/product-preview');

          }}>Preview product</button>

      </div>

      <hr />

      {/* Basic details */}
      <div className="bg-white p-4 rounded-lg px-[20px]">
        <h2 className="flex items-center text-lg font-bold mb-4 w-full">Basic details

          <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.basicDetails && 'rotate-[180deg'} `} onClick={() => toggleSection('basicDetails')} />

        </h2>
        {visibleSections.basicDetails && (

          <div className="space-y-4">
            <InputField
              type="text"
              placeholder="Product Title"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Product description"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              rows={2}
              name="description"
              value={product.description}
              onChange={() => handleInputChange}
              />
            <div className="flex space-x-4">
              <InputField
                type="number"
                placeholder="Price holder"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
              <InputField
                type="number"
                placeholder="Old price holder"
                name="oldPrice"
                value={product.oldPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <CollectionComponent />
            </div>

            <InputField
              type="number"
              placeholder="Inventory stocks"
              name="inventoryStocks"
              value={product.inventoryStocks}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      <hr />

      {/* Product Images */}
      <div className="bg-white p-4 mt-4 rounded-lg px-[20px]">
        <h2 className="w-full flex items-center text-lg font-bold mb-4">Product Images
          <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.productImages && 'rotate-[180deg'} `} onClick={() => toggleSection('productImages')} />

        </h2>

        <div className="space-y-4">
          {visibleSections.productImages &&

            product?.images.map((imageUrl, index) => (
              <div key={index} className="flex items-center justify-between gap-[10px]">
                <img
                  src={imageUrl?.url} // Dynamically display the uploaded image
                  alt="Product"
                  className="w-[60px] h-[60px] rounded-[8px] object-cover"
                />
                <img src="/images/more_vert.svg" alt="more" className='rotate-[90deg] ml-auto' />

                <Toggle checked={product.images[index].toggle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageToggleChange(e, index)} />
              </div>
            ))
          }
          <label
            className="w-full bg-[#00000008] px-4 py-3 font-[600] rounded-[90px] text-[14px] text-purple flex justify-center items-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="image-upload"
              onChange={handleAddImage} // Handle multiple image uploads
            />
            Add image <span className="ml-2">        <img src="/images/add-image.svg" alt="more" />
            </span>
          </label>
        </div>

      </div>

      <hr />


      {/* Inventory Variations */}
      <div className="bg-white p-4 mt-4 rounded-lg px-[20px]">
        {/* Title */}
        <h2 className="w-full flex items-center text-lg font-bold mb-4">Inventory variations
          {isVariableProduct && product?.variations?.length > 0 && <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.inventoryVariations && 'rotate-[180deg'} `} onClick={() => toggleSection('inventoryVariations')} />
          }
        </h2>


        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="variable-product"
            checked={isVariableProduct}
            onChange={(e) => setIsVariableProduct(e.target.checked)}
            className="w-full custom-checkbox"
          />

          <label htmlFor="variable-product" className="text-gray-700 ml-3">
            This product is variable; has different colors, sizes, weight,
            materials, etc.
          </label>
        </div>
        {visibleSections.inventoryVariations &&

          isVariableProduct && (
            <div className="space-y-4">
              {product?.variations.map((option, optionIdx) => (
                <div key={optionIdx} className="p-[10px] border rounded-[12px]">
                  <div className='flex flex-row items-center mb-[10px]'>
                    <div>
                      <span className='text-[#00000099] text-[10px]'>{option.option}</span>
                      <div className="flex justify-between items-center">
                        {/* Editable Option Name */}
                        <input
                          type="text"
                          value={option.name}
                          onChange={(e) =>
                            handleOptionNameChange(optionIdx, e.target.value)
                          }
                          placeholder="Enter name"
                          className="border-b-0 text-[#000000E5] text-[14px] font-semibold focus:outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>

                    {/* Option Settings Icon (Three dots) */}
                    <button
                    // className="text-gray-500 ml-auto relative"
                    // onClick={() =>
                    //   setOpenDropdownIdx(
                    //     openDropdownIdx === optionIdx ? null : optionIdx
                    //   )
                    // }
                    >
                      <img
                        src="/images/more_vert.svg"
                        alt="more"
                        className="rotate-[90deg] ml-auto"
                      />
                    </button>

                   
                  </div>

                  <hr />

                  {/* List of Option Values */}
                  <div className="flex flex-wrap items-center space-x-2 mt-[8px]">
                    {option.values.map((value: any, valueIdx: any) => (
                      <span
                        key={valueIdx}
                        className="flex items-center gap-[6px] bg-[#00000008] text-gray-700 px-[10px] py-1 rounded-full"
                      >
                        {value}
                        <button
                          onClick={() => handleRemoveValue(optionIdx, valueIdx)}
                          className="ml-1 text-[#00000099]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}


                  </div>
                  {/* Input for Adding New Values */}
                  <input
                    type="text"
                    placeholder="Enter values"
                    onKeyPress={(e) => handleKeyPress(e, optionIdx)}
                    className="border-b-0 text-gray-700 focus:outline-none focus:border-purple-600 mt-[12px]"
                  />
                </div>
              ))}

              {/* Add New Option Button */}
              <button
                className="w-full bg-gray-100 px-4 py-3 rounded-[90px] text-purple flex justify-center items-center"
                onClick={handleAddOption}
              >
                + Add new option
              </button>
            </div>

          )}
      </div>

      <hr />
      {/* Configure Variant Prices and Stocks */}
      {
        isVariableProduct &&

        <div className="bg-white p-4 mt-4 rounded-lg px-[20px]">

          <h2 className="w-full flex items-center text-lg font-bold mb-4">Configure variant prices and stocks
            {isVariableProduct && product?.variations?.length > 0 && <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.variants && 'rotate-[180deg'} `} onClick={() => toggleSection('variants')} />
            }
          </h2>

          <div className="flex flex-col gap-[8px]">
            {
              visibleSections?.variants &&
              product?.variantDetails?.map((variant: any, index: number) => (
                <div key={index} className="flex flex-col"
                >
                  <div className='flex items-center gap-[8px] mb-[8px]'>
                    <img src="/images/variant_placeholder.svg" alt="more" className='p-4 rounded-[10px] bg-[#0000001A]' />
                    <div className="flex flex-col text-gray-700 gap-[3px]">
                      {variant.combination}
                      <div>
                        ₦{variant?.price}- {variant?.stock}X
                      </div>
                    </div>
                    <img src="/images/more_vert.svg" alt="more" className='ml-auto' onClick={() => setActiveVariantIndex(activeVariantIndex === index ? null : index)}
                    />

                  </div>

                  {activeVariantIndex === index && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Price"
                          value={variant?.price}
                          onChange={(e) => handleVariantDetailChange(index, 'price', e.target.value)}
                          className="pl-2 pr-5 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                          style={{ paddingRight: '30px' }}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          ₦
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Stock"
                          value={variant?.stock}
                          onChange={(e) => handleVariantDetailChange(index, 'stock', e.target.value)}
                          className="pl-2 pr-5 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                          style={{ paddingRight: '30px' }}
                        />
                        <span className="absolute font-semibold right-2 top-1/2 transform -translate-y-1/2  pointer-events-none">
                          Units
                        </span>
                      </div>

                    </div>
                  )}

                </div>
              ))
            }
          </div>

        </div>
      }

      <hr />


      {/* Shipping */}
      <div className="bg-white p-4 mt-4 rounded-lg px-[20px]">
        <h2 className="w-full flex items-center text-lg font-bold mb-4">Shipping

          {isVariableProduct && product?.variations?.length > 0 && <img src={"/images/chevron.svg"} alt="toggle" className={`cursor-pointer ml-auto ${visibleSections.shipping && 'rotate-[180deg'} `} onClick={() => toggleSection('shipping')} />
          }
        </h2>

        {
          visibleSections.shipping &&

          <div className="space-y-2">
            <div className="flex items-center">

              <label htmlFor="self-shipping" className="text-gray-700">
                Self shipping
              </label>
              <input
                type="checkbox"
                id="self-shipping"
                className="ml-auto custom-checkbox"
                defaultChecked
              />
            </div>
            <div className="flex items-center">

              <label htmlFor="insta-shop-shipping" className="text-gray-700">
                InstaShop shipping
              </label>
              <input
                type="checkbox"
                id="insta-shop-shipping"
                className="ml-auto custom-checkbox"
                defaultChecked
              />
            </div>
            <InputField
              type="number"
              placeholder="Inventory stocks"
              name='inventoryStocks'
              value={product.inventoryStocks}
              onChange={handleInputChange}
            />
          </div>
        }
      </div>

      <hr />
      {/* Cancel and Save Buttons */}
      <div className="grid grid-cols-2 gap-4 justify-between mt-auto px-[20px] pt-8 pb-[40px]">
        <button
          className=" py-3 text-gray-600 border border rounded-[90px]"
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button onClick={() => {
          addProduct(product)
          router.push('/product-preview');

        }} className="bg-purple text-white py-3  rounded-[90px] "
        >Save</button>
      </div>
    </div>
  );
}
