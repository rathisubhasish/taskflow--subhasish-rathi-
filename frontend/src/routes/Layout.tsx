import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-mainBg">
      <div className="grid grid-cols-1 gap-1 sm:gap-4 md:grid-cols-[250px_1fr] container pt-4 ">
        <Navbar />
        <main className="px-4 sm:px-6 py-4 bg-cardBg rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
