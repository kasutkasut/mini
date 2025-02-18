import { X } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-lg font-bold text-blue-400">TELEGRAM</h1>
      <button className="text-gray-400 hover:text-white">
        <X size={24} />
      </button>
    </div>
  );
};

export default Navbar;
