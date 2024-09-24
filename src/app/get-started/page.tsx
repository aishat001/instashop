'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { Store, useAppStore, User } from '@/store.ts/useStore';

export default function GetStarted() {
  const router = useRouter();
  const { user, store, product, setUser, setStore, setProduct } = useAppStore();
  const [step, setStep] = useState(1);

  // Form state management
  const [contactInfo, setContactInfo] = useState('');


useEffect(() => {
  const queryStep = new URLSearchParams(window.location.search).get('step');
  if (queryStep) {
    setStep(Number(queryStep));
  }
}, []);

const handleNextStep = () => {
  if (step < 3) {
    setStep(step + 1);
    router.push(`?step=${step + 1}`); // Update URL with the new step
  } else {
    router.push('/create-product');
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (step === 1) {
      setUser({
        ...user,
        email: e.target.value
      });
    } else if (step === 2) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });   
     } else if (step === 3) {
      setStore({
        ...store,
        [e.target.name]: e.target.value,
      }); 
        }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStore({
          ...store,
          logo: e.target?.result,
        });       };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col px-[20px] w-full flex-1">
    {/* Step Indicator */}
    <div className="w-full  flex flex-col gap-[20px]">
      <button 
        className="text-black text-[16px] py-[9px] text-start flex flex-row items-center gap-[12px] font-[600]" 
        onClick={() => {
          if (step === 1) {
            router.push(`/`); 

          }
          if (step > 1) {
            setStep(step - 1);
            router.push(`?step=${step - 1}`); 
          }
        }}
      >
        <Image src="/images/arrow-back.svg" alt="Arrow back" width={12} height={12} />
        Get started
      </button>
      <div className="grid grid-cols-3 space-x-2 w-full">
        <div className={`h-[4px] rounded-[15px] ${step >= 1 ? 'bg-purple' : 'bg-gray-300'}`} />
        <div className={`h-[4px] rounded-[15px] ${step >= 2 ? 'bg-purple' : 'bg-gray-300'}`} />
        <div className={`h-[4px] rounded-[15px] ${step >= 3 ? 'bg-purple' : 'bg-gray-300'}`} />
      </div>
    </div>

      {/* Dynamic Step Content */}
      <div className="flex flex-col mt-[20px] w-full max-w-lg flex-1">
        <div className="flex-1">
          {step === 1 && (
            <>
              <h1 className="text-[24px] font-bold">Enter your phone number or email to get started</h1>
              <p className="text-[14px] mt-2">We will send you a verification code for confirmation</p>
              <div className="mt-6">
                <InputField
                name='email'
                  type="text"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Enter phone number or email"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-[24px] font-bold">Complete profile setup</h1>
              <p className="text-[14px] text-[#00000099] mt-[24px]">Connect your socials for quick setup</p>
              <div className="grid grid-cols-3 space-x-[8px] mt-[16px]">
                {['Instagram', 'tiktok', 'Google'].map((socialMedia) => (
                  <button
                    key={socialMedia}
                    className="bg-gray-100 flex justify-center items-center p-3 h-[48px] rounded-[12px]"
                  >
                    <img src={`/images/${socialMedia}.svg`} alt={socialMedia} className="h-6 w-6" />
                  </button>
                ))}
              </div>
              <p className="text-[14px] text-[#00000099] mt-[24px]">Or enter manually</p>
              <div className="space-y-4 mt-[16px]">
                <InputField
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                />
                <InputField
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
                <InputField
                  type="text"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
                <InputField
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="relative flex flex-col items-center gap-[12px] justify-center mt-[20px] border border-[#00000033] rounded-[12px] py-[16px]">
                <label className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                <img src={store.logo} alt="Store Logo" className="w-32 h-32 rounded-full mb-2" />
                <img src={'/images/upload-icon.svg'} alt="click" className="absolute rounded-full mb-2" />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <span className="text-[#00000066] text-[12px]">Upload store logo</span>
              </div>

              <div className="space-y-4 mt-6">
                <InputField
                  type="text"
                  name="storeName"
                  value={store.storeName}
                  onChange={handleInputChange}
                  placeholder="Store name"
                />
                <InputField
                  type="text"
                  name="storeTagName"
                  value={store.storeTagName}
                  onChange={handleInputChange}
                  placeholder="Store tag name"
                />
                <InputField
                  type="text"
                  name="storePhoneNumber"
                  value={store.storePhoneNumber}
                  onChange={handleInputChange}
                  placeholder="Store phone number"
                />
                <InputField
                  type="email"
                  name="storeEmail"
                  value={store.storeEmail}
                  onChange={handleInputChange}
                  placeholder="Store email"
                />
                <InputField
                  type="text"
                  name="category"
                  value={store.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </div>
            </>
          )}
        </div>
<div className=' pb-[40px]'>
<Button onClick={handleNextStep}>{step < 3 ? 'Continue' : 'Finish'}</Button>

</div>
      </div>
    </div>
  );
}
