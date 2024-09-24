export default function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {

    return (
    <button
      onClick={onClick}
      className="mt-8 bg-purple text-white py-3 w-full rounded-full "
      style={{ boxShadow: '4px 8px 24px 0px #FE2C5533' }}
    >
      {children}
    </button>
  );
}