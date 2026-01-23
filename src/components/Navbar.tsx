import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { logoutAlert } from "../utility/alert/logoutAlert";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout =async () => {
    const res = await logoutAlert();
    if(res.isConfirmed){
      localStorage.removeItem("token");
    navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Logo */}
        <div className="text-xl font-bold text-indigo-600">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Middle: Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          
          {token && (
            <Link to="/project-create" className="hover:text-indigo-600">Project Create</Link>
          )}
        </div>

        {/* Right: Auth/Profile */}
        {token ? (
          <div className="flex items-center gap-4 relative" ref={profileRef}>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-xl cursor-pointer"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setProfileOpen(false);
              }}
            >
              <FaBars />
            </button>

            {/* Profile Image */}
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setMenuOpen(false);
              }}
              className="w-10 h-10 rounded-full cursor-pointer border"
            />

            {/* Profile Dropdown */}
            <div
              className={`absolute right-0 top-14 w-48 bg-white rounded-md shadow-lg z-50 transition-all duration-200 ease-out origin-top ${
                profileOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/project-create"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                Project Create
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-3 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700 text-sm"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-3 bg-gray-50 rounded-lg overflow-hidden transition-all duration-200 ease-out ${
          menuOpen ? "max-h-40 opacity-100 p-3" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {token && <Link to="/project-create" onClick={() => setMenuOpen(false)}>Project Create</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
