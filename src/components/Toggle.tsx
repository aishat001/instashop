import React from 'react';

export default function Toggle({ checked, onChange }: { checked: boolean; onChange: any }) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="toggle-checkbox hidden"
        checked={checked}
        onChange={onChange}
      />
      
      <span className="relative">
        <span
          className={`block w-[32px] h-[20px] rounded-full transition-colors duration-200 ease-linear 
            ${checked ? 'bg-purple' : 'bg-gray-300'}`}
        ></span>
                <span
          className={`absolute left-1 top-0 mt-1  w-[15px] h-[15px] bg-white border border-gray-300 rounded-full transition-transform duration-200 ease-linear transform 
            ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        ></span>
      </span>

    </label>
  );
}
