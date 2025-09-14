import { FaRegSave } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { image } from "../assets/images";

function CreatePerson() {
  const navigate = useNavigate();

  return (
    <div className="px-6 ">
      <div className="flex items-center justify-between ">
        <div className="">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg outline bg-primary-100 outline-primary-600 hover:bg-primary-500 text-primary-950 px-2 py-1 hover:bg-success-hover hover:border-success-hover cursor-pointer"
          >
            <MdOutlineKeyboardArrowLeft className="inline mr-2" />
            <span>ย้อนกลับ</span>
          </button>
        </div>
        <div className="flex gap-4">
          <button
            // onClick={() => navigate("create-person")}
            className="rounded-lg outline bg-error-bg outline-error-border text-error-text px-2 py-1 hover:bg-hv-error-bg hover:border-hv-error-border cursor-pointer"
          >
            <GrClearOption className="inline mr-2" />
            <span>ยกเลิก</span>
          </button>
          <button
            // onClick={() => navigate("create-person")}
            className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-2 py-1 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
          >
            <FaRegSave className="inline mr-2" />
            <span>บันทึกข้อมูล</span>
          </button>
        </div>
      </div>
      <div className="mt-4  px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center ">
        <div className="flex flex-col items-center">
          <img src={image.personBoy} alt="" className="w-56 h-56 rounded-2xl" />
          <p>ศ.ดร. อัลบัส ดัมเบิลดอร์อัลบัส ดัมเบิลดอร์</p>
          <p>สังกัด : ฮอกวอตส์</p>
        </div>
        <div className="flex flex-col items-start justify-start text-lg gap-2 mt-2 w-full">
          <p>ความเชี่ยวชาญ : วิทยาศาสตร์</p>
        </div>
        <div className="boder"></div>
      </div>
    </div>
  );
}

export default CreatePerson;
