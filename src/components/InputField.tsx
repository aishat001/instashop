
interface InputFieldProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  name: string;
  onKeyPress?: any;
}

export default function InputField({ type, placeholder, onChange, value, name }: InputFieldProps) {
  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        type={type}
        name={name}
        value={value && value}
        onChange={onChange}
        className={`peer w-full z-[99999999999] relative px-4 text-[14px] bg-transparent text-[#00000099] font-bold h-[52px] rounded-[12px] border border-[#00000033] focus:ring-2 focus:ring-[#00000033] focus:outline-none`}
        placeholder=" " // Empty space so the placeholder doesn't interfere
      />

      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out
        ${value ? 'text-[10px] font-medium text-[#00000099] -translate-y-[20px]' : 'text-[14px] text-[#000000E5]'} peer-focus:text-[10px] peer-focus:-translate-y-[20px] peer-focus:text-[#00000099]`}
      >
        {placeholder}
      </label>
    </div>
  );
}
