"use client";

import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type SideNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideNav({ isOpen, setIsOpen }: SideNavProps) {

  const links = [

    { name: "Overview", href: "/dashboard" },
    { name: "My Applications", href: "/dashboard/myApplications" },
    { name: "My Posted Jobs", href: "/dashboard/myPostedJobs" },
    { name: "Bookmarks", href: "/dashboard/bookmarks" },
    { name: "Profile", href: "/dashboard/profile" },

  ];

  return (
    <>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
      )}

      <aside
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-[#1e1b4b] text-white z-40 shadow-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        <div className="flex items-center justify-between p-5 border-b border-[#363373]">

          <h2 className="text-2xl font-bold">HireHub</h2>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-1 rounded-md hover:bg-[#312e81] transition cursor-pointer">

            {isOpen ? <CloseIcon /> : <MenuIcon />}
          
          </button>

        </div>
  
        <nav className="space-y-2 px-2 pt-4">

          {links.map((link, index) => (

            <Link key={index} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-[#312e81] hover:text-white transition">

              {link.name}

            </Link>

          ))}

        </nav>

      </aside>
  
      {!isOpen && (

        <button onClick={() => setIsOpen(true)} className="md:hidden absolute top-4 left-4 z-50 bg-[#1e1b4b] text-white p-1 rounded-lg shadow-lg cursor-pointer">
    
          <MenuIcon />
  
        </button>

      )}

    </>
  );
  
}

export default SideNav;
