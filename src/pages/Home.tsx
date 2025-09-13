import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import CustomDropDown from "../components/CustomDropDown";

function Home() {
  const [search, setSearch] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [expertise, setExpertise] = useState("");

  const serchPerson = () => {
    console.log("Searching for:", search);
  };

  const options = [
    { value: "", label: "-- สังกัด --" },
    { value: "a", label: "lorem10" },
    { value: "b", label: "b" },
  ];

  const expertiseData = [
    { value: "", label: "-- ความเชี่ยวชาญ --" },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "b", label: "b" },
  ];

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative w-96">
            <input
              type="text"
              className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
              placeholder="ชื่อ - นามสกุล ผู้ทรงคุณวุฒิ"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={serchPerson}
              className="absolute right-0 top-5 -translate-y-1/2 text-primary-50 focus:outline-none py-2 px-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 border-none"
            >
              <IoSearchSharp className="w-6 h-6" />
            </button>
          </div>
          <div className="relative w-60">
            <CustomDropDown
              options={options}
              value={affiliation}
              onChange={(value) => setAffiliation(value)}
            />
          </div>
          <div className="w-60">
            <CustomDropDown
              options={expertiseData}
              value={expertise}
              onChange={(value) => setExpertise(value)}
            />
          </div>
        </div>
        <button className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-4 py-2 hover:bg-success-hover hover:border-success-hover cursor-pointer">
          <FaPlus className="inline mr-2" />
          <span>ผู้ทรงคุณวุฒิ</span>
        </button>
      </div>

      <div className="w-96 h-96 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)]"></div>
    </div>
  );
}

export default Home;
