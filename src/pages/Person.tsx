import { MdEdit, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { usePersonStore } from "../stores/person";
import { image } from "../assets/images";
import DialogLoading from "../components/DialogLoding";
import { useEffect, useState } from "react";
import AlertConfrim from "../components/AlertConfrim";

function Person() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { getById, removePerson } = usePersonStore();
  const personData = getById(Number(id));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertConfrim, setAlertConfrim] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <AlertConfrim
        open={alertConfrim}
        setOpen={setAlertConfrim}
        onConfrim={() => {
          removePerson(Number(id));
          setAlertConfrim(false);
          navigate(`/`);
        }}
        title="ยืนยันการลบข้อมูลหรือไม่"
        massage={`ถ้าลบแล้วข้อมูล ${personData?.perfix_name} ${personData?.first_name}  ${personData?.last_name} จะไม่สามารถนำกลับมาได้`}
      />
      <div className="px-6 pb-6 w-full">
        <div className="flex items-center justify-between w-full">
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
              onClick={() => navigate(`/create-person/${id}`)}
              className="rounded-lg outline bg-edit-bg outline-edit-border text-edit-text px-2 py-1 hover:bg-hv-edit-bg hover:border-hv-edit-border cursor-pointer"
            >
              <MdEdit className="inline mr-2" />
              <span>แก้ไขข้อมูล</span>
            </button>
            <button
              onClick={() => setAlertConfrim(true)}
              className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-2 py-1 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
            >
              <RiDeleteBin5Line className="inline mr-2" />
              <span>ลบข้อมูล</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <DialogLoading isLoading={isLoading} />
        ) : (
          <div className="w-full mt-4 px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center text-xl">
            <div className="flex flex-col items-center text-3xl ">
              <img
                src={
                  personData?.image_url == ""
                    ? `${image.user}`
                    : `${personData?.image_url}`
                }
                alt=""
                className="w-56 h-56 rounded-2xl shadow-[0px_0px_8px_4px_rgba(0,0,0,0.25)] mb-4"
              />
              <p>
                {personData?.first_name} {personData?.last_name}
              </p>
              {personData?.retired ? (
                <p>เกษียณอายุ</p>
              ) : (
                <p>สังกัด : {personData?.affiliation ?? "ไม่มี"}</p>
              )}
            </div>
            <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
            <div className="flex flex-col items-center justify-center mt-2 w-full ">
              <div className="flex flex-col gap-2 w-full px-20">
                <div className="flex items-start justify-center gap-8 w-full">
                  <p className="text-2xl">ความเชี่ยวชาญ</p>
                </div>
                <div className="flex">
                  <p>สาขาความเชี่ยวชาญหลัก (OECD) : </p>
                  <div className="flex flex-col ml-2">
                    {personData?.expertise_main?.map(
                      (expertise_main, index) => (
                        <p key={index}>- {expertise_main}</p>
                      )
                    )}
                  </div>
                </div>
                <div className="flex">
                  <p>สาขาความเชี่ยวชาญย่อย (OECD) : </p>
                  <div className="flex flex-col ml-2">
                    {personData?.expertise_second?.map(
                      (expertise_second, index) => (
                        <p key={index}>- {expertise_second}</p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
            <div className="flex flex-col gap-2 w-full px-20">
              <div className="flex items-start justify-center gap-8 w-full">
                <p className="text-2xl">ช่องทางการติดต่อ</p>
              </div>
              <p>Email : {personData?.contact.email || "--"}</p>
              <div className="flex">
                <p>โทรศัพท์ : </p>
                <div className="flex flex-col ml-2">
                  {personData?.contact.phone.map((phone, index) => (
                    <p key={index}>{phone}</p>
                  ))}
                </div>
              </div>
              <div className="flex">
                <p>
                  ที่อยู่ (หน่วยงาน/บ้านพัก) :{" "}
                  <span>{personData?.contact.address || "--"}</span>
                </p>
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
                  {personData?.bank.bank_logo_url && (
                    <img
                      src={personData?.bank.bank_logo_url}
                      alt=""
                      className="w-10 h-10 inline mr-2 rounded-full"
                    />
                  )}
                </span>
                {personData?.bank.bank_name || "--"}
              </p>
              <p>เลขบัญชี : {personData?.bank.bank_number}</p>
            </div>
            <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
            <div className="flex items-start justify-center gap-8 mt-2 w-full">
              <div className="flex flex-col gap-2 w-full px-20">
                <div className="flex items-start justify-center gap-8 w-full">
                  <p className="text-2xl">ประวัติการประเมิน </p>
                </div>
                <ul className="list-disc list-inside">
                  {personData?.history &&
                    personData.history.map((history, index) => (
                      <li key={index}>{history}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
            <div className="flex items-start justify-center mt-2 gap-8 w-full">
              <div className="flex flex-col gap-2 w-full px-20">
                <div className="flex items-start justify-center gap-8 w-full">
                  <p className="text-2xl">ลักษณะพิเศษ ของผู้ทรงคุณวุฒิ</p>
                </div>
                <ul className="list-disc list-inside">
                  {personData?.characteristic &&
                    personData.characteristic.map((charac, index) => (
                      <li key={index}>{charac}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
            {personData?.note && (
              <p className="text-error-text text-2xl mt-2">
                หมายเหตุ : {personData?.note || "--"}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Person;
