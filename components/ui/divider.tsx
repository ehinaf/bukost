const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex py-6 items-center">
      <div className="flex-grow border-t-[1px] border-gray-300"></div>
      <span className="flex-shrink mx-4 text-gray-800 text-sm">{children}</span>
      <div className="flex-grow border-t-[1px] border-gray-300"></div>
    </div>
  );
};

export default Divider;
