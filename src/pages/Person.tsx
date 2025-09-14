import { MdEdit, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { image } from "../assets/images";

function Person() {
  const navigate = useNavigate();

  return (
    <div className="px-6 pb-6">
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
            onClick={() => navigate("/create-person")}
            className="rounded-lg outline bg-edit-bg outline-edit-border text-edit-text px-2 py-1 hover:bg-hv-edit-bg hover:border-hv-edit-border cursor-pointer"
          >
            <MdEdit className="inline mr-2" />
            <span>แก้ไขข้อมูล</span>
          </button>
          <button
            // onClick={() => navigate("/create-person")}
            className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-2 py-1 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
          >
            <RiDeleteBin5Line className="inline mr-2" />
            <span>ลบข้อมูล</span>
          </button>
        </div>
      </div>
      <div className="mt-4 px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center text-xl">
        <div className="flex flex-col items-center text-3xl ">
          <img src={image.personBoy} alt="" className="w-56 h-56 rounded-2xl" />
          <p>ศ.ดร. อัลบัส ดัมเบิลดอร์อัลบัส ดัมเบิลดอร์</p>
          <p>สังกัด : ฮอกวอตส์</p>
        </div>
        <div className="flex items-start justify-center gap-8 mt-2 w-full ">
          <p>สาขาความเชี่ยวชาญหลัก (OECD) : วิทยาศาสตร์</p>
          <p>สาขาความเชี่ยวชาญย่อย (OECD) : คอมพิวเตอร์</p>
        </div>
        <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
        <div className="flex flex-col gap-2 w-full px-20">
          <div className="flex items-start justify-center gap-8 w-full">
            <p className="text-2xl">ช่องทางการติดต่อ</p>
          </div>
          <p>Email : example@test.com</p>
          <div className="flex">
            <p>โทรศัพท์ : </p>
            <div className="flex flex-col ml-2">
              <p>0-2xxx-xxxx ต่อ xxxx</p>
              <p>02-xxxxxxx</p>
              <p>08x-xxx-xxxx</p>
            </div>
          </div>
          <div className="flex">
            <p >ที่อยู่ (หน่วยงาน/บ้านพัก) : <span>สถาบันเทคโนโลยีนานาชาติสิรินธร (SIIT) มหาวิทยาลัยธรรมศาสตร์
                ศูนย์รังสิต อ. คลองหลวง จ. ปทุมธานี 12121</span></p>
          </div>
        </div>
        <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
        <div className="flex flex-col gap-2 w-full px-20">
          <div className="flex items-start justify-center gap-8 w-full">
            <p className="text-2xl">บัญชีธนาคาร</p>
          </div>
          <p>
            ธนาคาร :{" "}
            <span>
              <img
                src="https://i.pinimg.com/736x/cc/bd/c5/ccbdc5e48a21840cb43f386224e01377.jpg"
                alt=""
                className="w-10 h-10 inline mr-2 rounded-full"
              />
            </span>
            กสิกรไทย
          </p>
          <p>เลขบัญชี : xxx-x-xxxxx-x</p>
        </div>
        <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
        <div className="flex items-start justify-center gap-8 mt-2 w-full">
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ประวัติการประเมิน </p>
            </div>
            <p>ปี 2566</p>
            <p>ปี 2567</p>
            <p>ปี 2570</p>
          </div>
        </div>
        <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
        <div className="flex items-start justify-center mt-2 gap-8 w-full">
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ลักษณะพิเศษ ของผู้ทรงคุณวุฒิ</p>
            </div>
            <ul className="list-disc list-inside">
              <li> ติดต่อผ่านไลน์ (Add LINE ด้วยเบอร์โทร)</li>
              <li>ตรวจและประเมินแบบกระดาษ</li>
              <li>ใบเสร็จรับเงินแบบกระดาษ</li>
              <li>
                ส่งไปรษณีย์ แบบลงทะเบียน เท่านั้น (เตรียมจ่าหน้าซองและซองไปด้วย)
              </li>
              <li>ตอบไว ประเมินไว ให้ข้อเสนอแนะเยอะ</li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
        <p className="text-error-text text-2xl mt-2">
          หมายเหตุ : ไม่ได้สังกัดสถาบันชีววิทยาศาสตร์โมเลกุล มหาวิทยาลัยมหิดล
          (อายุเยอะ)
        </p>
      </div>
    </div>
  );
}

export default Person;
