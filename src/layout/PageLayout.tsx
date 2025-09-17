import { Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { image } from "../assets/images";
import { useAuthStore } from "../stores/auth";
import { useEffect, useRef, useState } from "react";

function PageLayout() {
  const { user,logout } = useAuthStore();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user) {
      return;
    } else {
      navigate("/auth/login");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-screen bg-primary-50 max-w-full">
      <header className="fixed top-0 inset-x-0 h-16 bg-primary-400 flex justify-between items-center px-4 z-50">
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-14 object-contain"
            src={image.logoIRD}
            alt=""
          />
          <div className="text-2xl font-normal font-lavishly">
            ระบบฐานข้อมูลผู้ทรงคุณวุฒิ
          </div>
        </div>
        <div className="" ref={dropdownRef}>
          <div
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className="flex items-center text-2xl gap-4"
          >
            <FaUserCircle className="w-10 h-10" />
            <p>{user?.name}</p>
          </div>
          {open && (
            <ul className="absolute mt-1 bg-primary-100 border border-primary-600 rounded-lg z-10 w-64">
              <li
                onClick={() => {
                  setOpen(false);
                }}
                className={`px-3 py-2  hover:bg-primary-600 hover:text-primary-50 cursor-pointer rounded-lg `}
              >
                ข้อมูลส่วนตัว
              </li>
              <li
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate("/auth/login");
                }}
                className={`px-3 py-2  hover:bg-primary-600 hover:text-primary-50 cursor-pointer rounded-lg `}
              >
                ออกจากระบบ
              </li>
            </ul>
          )}
        </div>
      </header>
      <main className="pt-18">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
