const CoffeeButton = () => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <a
        href="https://buymeacoffee.com/alessandro_della_flora"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 rounded-lg bg-[#4A5565] px-3 py-1.5 text-xs text-white shadow-md hover:scale-105 transition"
      >
        ☕ <span>Support</span>
      </a>
    </div>
  );
};

export default CoffeeButton;
