import  Link  from "next/link"
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  return (
    <nav className="bg-white px-6 md:px-10 py-4 flex justify-between items-center shadow-sm">

      {/* Logo - Left Side */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-0.5">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm block" />
            <span className="w-2.5 h-2.5 bg-red-400 rounded-sm block" />
          </div>
          <div className="flex gap-0.5">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm block" />
            <span className="w-2.5 h-2.5 bg-green-400 rounded-sm block" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">HireHub</h1>

        <div className="flex items-center gap-8 ml-10">
          <Link href={"/"} className="hidden md:block text-sm font-medium transition-colors hover:text-primary">Browse Jobs</Link>
          <Link href={"/"} className="text-sm font-medium transition-colors hover:text-primary">Post a Job</Link>
        </div>
      </div>

      {/* Buttons - Right Side */}
      <NavbarActions />

    </nav>
  );
};

export default Navbar;