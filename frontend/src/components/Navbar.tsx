import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenu } from "react-icons/hi";
import Button from "./ui/Button";
import { privateRoutes } from "../routes/config";
import { logout } from "../store/authSlice";
import ThemeToggle from "./ui/ThemeToggle";
import { useAppDispatch } from "../store";
import { setTheme } from "../store/uiSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItems = privateRoutes.filter((route) => route.label);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block p-2 rounded-md text-base text-center font-medium transition ${
      isActive
        ? "bg-hoverBg text-content-primary"
        : "text-content-secondary hover:bg-hoverBg"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setTheme("light"));
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-cardBg p-4 rounded-2xl mb-4">
        <Link to="/" className="flex items-center">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-primary via-blue-500 to-red-400 bg-clip-text text-transparent cursive">
            TaskFlow
          </h3>
        </Link>

        <div className="ml-auto">
          <ThemeToggle />
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <HiOutlineMenu size={25} />
          </Button>
        </div>
      </div>

      <aside className="hidden md:flex md:flex-col md:h-[96vh] md:sticky md:top-4 bg-cardBg rounded-2xl p-4">
        <div className="w-full flex pb-3 gap-4 items-center justify-between">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-primary via-blue-300 to-red-800 text-center bg-clip-text text-transparent cursive">
            TaskFlow
          </h3>
          <ThemeToggle />
        </div>

        <hr className="opacity-20" />

        <nav className="space-y-2 pt-4 flex-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <hr className="opacity-20" />
        <Button
          variant="primary"
          className="w-full bg-red-600 hover:bg-red-700 text-white border-none mt-auto py-1 rounded-lg transition-colors"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 bg-cardBg px-4 py-4 md:hidden flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold bg-gradient-to-r cursive from-primary via-blue-500 to-red-400 bg-clip-text text-transparent">
              TaskFlow
            </h3>

            <Button variant="ghost" onClick={() => setOpen(false)}>
              <RxCross2 size={25} className="text-content-primary" />
            </Button>
          </div>

          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button
            variant="ghost"
            className="w-full text-error border-2 bg-errorBg mt-auto py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
