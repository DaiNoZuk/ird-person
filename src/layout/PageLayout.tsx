import { Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { image } from "../assets/images";

function PageLayout() {
  return (
    <div className="min-h-screen w-screen bg-primary-50 max-w-full">
      <header className="fixed top-0 inset-x-0 h-16 bg-primary-400 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <img className="w-16 h-14 object-contain" src={image.logoIRD} alt="" />
          <div className="text-2xl font-normal font-lavishly">
            ระบบฐานข้อมูลผู้ทรงคุณวุฒิ
          </div>
        </div>
        <div className="flex items-center text-2xl gap-4">
          <FaUserCircle className="w-10 h-10" />
          <p>Super Admin</p>
        </div>
      </header>
      <main className="pt-18">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
