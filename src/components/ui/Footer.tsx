const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 md:px-12 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        {/* Logo - Left Side */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <span className="w-2 h-2 bg-blue-500 rounded-sm block" />
              <span className="w-2 h-2 bg-red-400 rounded-sm block" />
            </div>
            <div className="flex gap-0.5">
              <span className="w-2 h-2 bg-yellow-400 rounded-sm block" />
              <span className="w-2 h-2 bg-green-400 rounded-sm block" />
            </div>
          </div>
          <span className="font-bold text-white text-sm">HireHub</span>
        </div>

        {/* Copyright - Center */}
        <p className="text-xs text-gray-400">© 2026 HireHub. All rights reserved.</p>

        {/* Links - Right Side */}
        <ul className="flex gap-6 text-gray-400 text-xs">
          <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer">Terms of Service</li>
          <li className="hover:text-white cursor-pointer">Contact</li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;