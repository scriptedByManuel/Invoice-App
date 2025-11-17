const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-5xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
