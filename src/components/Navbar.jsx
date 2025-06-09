import { useAuth } from "@/containers/AuthGuard";
import React, { useState } from "react";
import supabase from "@/utils/supabaseClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import navCategory from "@/data/navCategory";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleNavOnClick = id => {
    const [navList, setNavlist] = useState(navCategory);

    const newNavList = navList.map(nav => {
      nav.active = false;
      if (nav._id === id) nav.active = true;
    });

    setNavlist(newNavList)
  }

  const handleLogout = async () => {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <nav className="flex items-center justify-between py-2 px-10 bg-white shadow-sm ">
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">Demo</span>
      </div>
      <div className="flex items-center">
        <ul className="nav-list flex space-x-4 text-gray-600 text-sm">
          {
            navCategory.map(nav => (
              <li>
                <a href={nav.link}
                className={`${nav.active ? 'active' : undefined}`}
                onClick={() => {
                  handleNavOnClick(nav._id);
                }}>{nav.name}</a>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <FaUser className="mr-2 text-gray-600" />
          <span className="text-sm text-gray-600">
            {user?.identities?.[0]?.identity_data?.full_name || user?.email}
          </span>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
