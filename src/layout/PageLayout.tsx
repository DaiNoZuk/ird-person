import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBuilding, FaHome, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { image } from "../assets/images";
import { useAuthStore } from "../stores/auth";
import { useEffect, useRef, useState } from "react";
import { BiSolidReport } from "react-icons/bi";
import { MdManageAccounts, MdOutlinePsychology } from "react-icons/md";

function PageLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(location.pathname);
  const pageMenu = [
    {
      path: "/",
      icon: <FaHome  className="w-4 h-4"/>,
      lable: "หน้าหลัก",
      permission: "admin",
    },
    {
      path: "/create-person",
      icon: <FaUserAlt className="w-4 h-4"/>,
      lable: "เพิ่มผู้ทรงคุณวุฒิ",
      permission: "admin",
    },
    {
      path: "/affiliation",
      icon: <FaBuilding className="w-4 h-4"/>,
      lable: "สังกัด",
      permission: "admin",
    },
    {
      path: "/expertise",
      icon: <MdOutlinePsychology className="w-4 h-4"/>,
      lable: "ความเชี่ยวชาญ",
      permission: "admin",
    },
    {
      path: "/menagment-user",
      icon: <MdManageAccounts className="w-4 h-4"/>,
      lable: "จัดการผู้ใช้งาน",
      permission: "admin",
    },
    {
      path: "/report",
      icon: <BiSolidReport className="w-4 h-4"/>,
      lable: "รายงาน",
      permission: "admin",
    },
  ];

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
    <div className="min-h-screen w-screen bg-primary-50 max-w-full flex justify-center">
      <header className="fixed top-0 inset-x-0 h-16 bg-primary-400 flex justify-between items-center px-4 z-50 border border-primary-900">
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
      <main className="flex w-full">
        <div className="pt-20 bg-primary-100 border-r-1 border-primary-200 flex flex-col gap-4 w-44">
          {pageMenu.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              className={`px-2 flex gap-2 items-center hover:underline hover:text-primary-500 ${
                location.pathname == menu.path
                  ? "text-primary-500 underline"
                  : ""
              }`}
            >
              {menu.icon} <span>{menu.lable}</span>
            </Link>
          ))}
        </div>
        <div className="pt-18 flex justify-center w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
