"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type SideNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard" },
    { name: "My Applications", href: "/dashboard/myApplications" },
    { name: "My Posted Jobs", href: "/dashboard/myPostedJobs" },
    { name: "Bookmarks", href: "/dashboard/bookmarks" },
    { name: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Mobile Overlay (Sirf mobile pe dikhega) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/50 z-100 md:hidden" 
        />
      )}

      <aside
        className={`
          /* Mobile Styles: Bilkul top par aur Navbar ke upar */
          fixed top-0 left-0 h-full z-110 transform transition-transform duration-300
          
          /* Desktop Styles: Navbar ke niche (sticky) aur scroll ke saath adjust hoga */
          md:sticky md:top-16 md:translate-x-0 md:h-[calc(100vh-64px)] md:z-30
          
          w-64 bg-[#1e1b4b] text-white shadow-xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HireHub & Cross: Sirf Mobile size par dikhenge */}
        <div className="md:hidden flex items-center justify-between p-5 border-b border-[#363373]">
          <h2 className="text-2xl font-bold">HireHub</h2>
          <button onClick={() => setIsOpen(false)} className="text-white p-1 cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-3 pt-6 md:pt-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                    ? "bg-[#312e81] text-white" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Hamburger Button: Z-index 90 rakha hai taake Navbar ke upar rahe mobile pe */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="md:hidden fixed top-4 left-4 z-90 bg-[#1e1b4b] text-white p-1 rounded-lg shadow-lg cursor-pointer"
        >
          <MenuIcon />
        </button>
      )}
    </>
  );
}

export default SideNav;
