import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";

function AppLayout() {
  return (
    <div className="z-50 mt-[83px] h-full bg-stone-50 ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
