import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import DialogSearch from "../components/DialogSearch";
import { image } from "../assets/images";
import { PiNewspaperClipping } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [expertise, setExpertise] = useState("");

  const serchPerson = () => {
    console.log("Searching for:", search);
  };

  const data = [0, 1];
  // const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const options = [
    { value: "", label: "-- สังกัด --" },
    { value: "a", label: "lorem10" },
    { value: "b", label: "b" },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
    { value: "a", label: "Lorem ipsum dolor sit amet sit sit." },
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
            <DialogSearch
              dataValues={options}
              value={affiliation}
              onChange={(value) => setAffiliation(value)}
            />
          </div>
          <div className="w-60">
            <DialogSearch
              dataValues={expertiseData}
              value={expertise}
              onChange={(value) => setExpertise(value)}
            />
          </div>
        </div>
        <button
          onClick={() => navigate("create-person")}
          className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-4 py-2 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
        >
          <FaPlus className="inline mr-2" />
          <span>ผู้ทรงคุณวุฒิ</span>
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 pb-6">
        {data &&
          data.map((item: any) => (
            <div className="mt-4  px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center ">
              <div className="flex flex-col items-center">
                <img
                  src={image.personBoy}
                  alt=""
                  className="w-56 h-56 rounded-2xl"
                />
                <p className="text-2xl">
                  {item == 0
                    ? "ศ.ดร. อัลบัส ดัมเบิลดอร์อัลบัส ดัมเบิลดอร์"
                    : "รศ.ดร. แฮร์รี่ พอต"}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start text-lg gap-2 mt-2 w-full">
                <p>สังกัด : ฮอกวอตส์</p>
                <p>ความเชี่ยวชาญ : วิทยาศาสตร์</p>
                <button
                  onClick={() => navigate(`/person/${item}`)}
                  className="flex items-center gap-2 rounded-lg outline bg-wait-text outline-primary-600 text-wait-bg px-4 py-1 hover:bg-hv-wait-text hover:border-hv-wait-border cursor-pointer"
                >
                  <PiNewspaperClipping />
                  <span>รายละเอียด</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
