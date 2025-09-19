import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Bank, Person } from "../types";

// compronents
import { image } from "../assets/images";
import InputCustom from "../components/InputCustom";
import ListInput from "../components/ListInput";
import DailogBank from "../components/DialogBank";
import DialogInsertExpertise from "../components/DialogInsertExpertise";
import DialogInsertAffiliation from "../components/DialogInsertAffiliation";

// icons
import { FaCheck, FaRegSave } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { LuImage } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { usePersonStore } from "../stores/person";
import { useAuthStore } from "../stores/auth";
import DialogLoading from "../components/DialogLoding";

function CreatePerson() {
  const navigate = useNavigate();
  const { nextId, getById, addPerson, updatePerson } = usePersonStore();
  const { user } = useAuthStore();
  const { id: routeId } = useParams<{ id?: string }>();
  const editId = routeId ? Number(routeId) : undefined;
  const isEdit = Number.isFinite(editId);

  const [perfixName, setPerfixName] = useState("");
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [expertiseMain, setExpertiseMain] = useState<string[]>([]);
  const [expertiseSecond, setExpertiseSecond] = useState<string[]>([]);
  const [retired, setRetired] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState<string[]>([""]);
  const [contactAddress, setContactAddress] = useState("");
  const [bank, setBank] = useState<Bank>({
    bank_logo_url: "",
    bank_name: "",
    bank_number: "",
  });
  const [history, setHistory] = useState<string[]>([""]);
  const [characteristic, setCharacteristic] = useState<string[]>([""]);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    const existing = getById(editId!);
    if (!existing) {
      navigate("/");
      return;
    }
    setPerfixName(existing.perfix_name || "");
    setFristName(existing.first_name || "");
    setLastName(existing.last_name || "");
    setAffiliation(existing.affiliation || "");
    setExpertiseMain(
      Array.isArray(existing.expertise_main) ? existing.expertise_main : []
    );
    setExpertiseSecond(
      Array.isArray(existing.expertise_second) ? existing.expertise_second : []
    );
    setRetired(!!existing.retired);
    setContactEmail(existing.contact?.email || "");
    setContactPhone(
      Array.isArray(existing.contact?.phone) ? existing.contact!.phone : [""]
    );
    setContactAddress(existing.contact?.address || "");
    setBank({
      bank_logo_url: existing.bank?.bank_logo_url || "",
      bank_name: existing.bank?.bank_name || "",
      bank_number: existing.bank?.bank_number || "",
    });
    setHistory(Array.isArray(existing.history) ? existing.history : [""]);
    setCharacteristic(
      Array.isArray(existing.characteristic) ? existing.characteristic : [""]
    );
    setNote(existing.note || "");
    setPreviewUrl(existing.image_url || null);
    setFileName("");
  }, [isEdit, editId, getById, navigate]);

  const pageTitle = isEdit ? `แก้ไขข้อมูลผู้ทรงคุณวุฒิ` : "เพิ่มผู้ทรงคุณวุฒิ";

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string); // data:image/...;base64,...
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFileName("");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addPhone = () => setContactPhone((prev) => [...prev, ""]);
  const updatePhone = (v: string, i: number) =>
    setContactPhone((prev) => prev.map((p, idx) => (idx === i ? v : p)));
  const removePhone = (i: number) =>
    setContactPhone((prev) => prev.filter((_, idx) => idx !== i));

  const addHistory = () => setHistory((prev) => [...prev, ""]);
  const updateHistory = (v: string, i: number) =>
    setHistory((prev) => prev.map((p, idx) => (idx === i ? v : p)));
  const removeHistory = (i: number) =>
    setHistory((prev) => prev.filter((_, idx) => idx !== i));

  const addCharacteristic = () => setCharacteristic((prev) => [...prev, ""]);
  const updateCharacteristic = (v: string, i: number) =>
    setCharacteristic((prev) => prev.map((p, idx) => (idx === i ? v : p)));
  const removeCharacteristic = (i: number) =>
    setCharacteristic((prev) => prev.filter((_, idx) => idx !== i));

  const onSave = () => {
    const nowIso = new Date().toISOString();

    const idToUse = isEdit ? editId! : nextId();

    const original = isEdit ? getById(editId!) : undefined;

    const personData: Person = {
      id: idToUse,
      perfix_name: perfixName,
      first_name: fristName,
      last_name: lastName,
      image_url: previewUrl ?? "",
      affiliation,
      expertise_main: expertiseMain,
      expertise_second: expertiseSecond,
      retired,
      contact: {
        email: contactEmail,
        phone: contactPhone.filter(Boolean),
        address: contactAddress,
      },
      bank,
      history: history.filter(Boolean),
      characteristic: characteristic.filter(Boolean),
      note,
      created_by: isEdit ? original?.created_by ?? "" : user?.name ?? "",
      created_date: isEdit ? original?.created_date ?? "" : nowIso,
      updated_by: isEdit ? user?.name ?? "" : "",
      updated_date: isEdit ? nowIso : "",
    };

    if (isEdit) {
      setIsLoading(true);
      updatePerson(idToUse, personData);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
    } else {
      setIsLoading(true);
      addPerson(personData);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="px-6 pb-6 w-full">
      <div className="flex items-center justify-between">
        <div className="">
          <button
            onClick={() =>
              isEdit ? navigate(`/person/${editId}`) : navigate("/")
            }
            className="rounded-lg outline bg-primary-100 outline-primary-600 hover:bg-primary-500 text-primary-950 px-2 py-1 hover:bg-success-hover hover:border-success-hover cursor-pointer"
          >
            <MdOutlineKeyboardArrowLeft className="inline mr-2" />
            <span>ย้อนกลับ</span>
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onSave}
            className="rounded-lg outline bg-error-bg outline-error-border text-error-text px-2 py-1 hover:bg-hv-error-bg hover:border-hv-error-border cursor-pointer"
          >
            <GrClearOption className="inline mr-2" />
            <span>ยกเลิก</span>
          </button>
          <button
            onClick={onSave}
            className="rounded-lg outline bg-success-bg outline-success-border text-success-text px-2 py-1 hover:bg-hv-success-bg hover:border-hv-success-border cursor-pointer"
          >
            <FaRegSave className="inline mr-2" />
            <span>บันทึกข้อมูล</span>
          </button>
        </div>
      </div>
      {isLoading ? (
        <DialogLoading isLoading={isLoading} />
      ) : (
        <div className="mt-4  px-4 py-2 bg-blue-200 rounded-2xl shadow-[0px_0px_10px_5px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center ">
          {/* -------- ฟอร์มข้อมูล --------- */}
          {/* -------- รูป --------- */}
          <div className="flex flex-col items-center">
            <p className="text-4xl">{pageTitle}</p>
            {/* รูป: คลิกได้ */}
            <img
              src={previewUrl ?? image.user}
              alt="preview"
              className="w-56 h-56 rounded-2xl object-fill cursor-pointer mt-4 hover:opacity-80"
              onClick={openFilePicker}
              title="คลิกเพื่อเลือกรูปภาพ"
            />
            {/* ปุ่มอัพโหลด + ชื่อไฟล์ + ปุ่มลบ */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={openFilePicker}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-100 text-primary-950 hover:bg-primary-200 cursor-pointer outline outline-primary-600"
              >
                <LuImage className="w-6 h-6" />
                <span>อัพโหลดรูปภาพ</span>
              </button>

              {/* แสดงชื่อไฟล์ (ถ้ามี) + ปุ่มลบ */}
              {fileName && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary-950 bg-white/70 px-2 py-1 rounded">
                    {fileName}
                  </span>
                  <button
                    onClick={removeImage}
                    className="text-sm px-2 py-1 rounded bg-error-bg text-error-text outline outline-error-border hover:bg-hv-error-bg"
                    title="ลบรูป"
                  >
                    ลบรูป
                  </button>
                </div>
              )}
            </div>

            {/* input file ที่ซ่อนไว้ */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
          {/* -------- ชื่อ - นามสกุล - สังกัด --------- */}
          <div className="flex gap-4 px-20 mt-4 w-full">
            <div className="w-full">
              <InputCustom
                lable="คำนำหน้า"
                value={perfixName}
                setValue={setPerfixName}
                required
              />
            </div>
            <div className="w-full">
              <InputCustom
                lable="ชื่อ"
                value={fristName}
                setValue={setFristName}
                required
              />
            </div>
            <div className="w-full">
              <InputCustom
                lable="นามสกุล"
                value={lastName}
                setValue={setLastName}
                required
              />
            </div>
          </div>
          <div className="flex px-20 gap-4 w-full items-center mt-4">
            <div className="flex items-center w-1/2 h-full gap-2">
              <DialogInsertAffiliation
                onChange={(value) => setAffiliation(value)}
                placeholderInput="ค้นหาสังกัด"
                lable="เลือกสังกัด"
              />
              <p>
                สังกัด
                <span className="text-error-text mr-2">*</span>:
              </p>
              {affiliation == "" ? null : (
                <p className="px-2 py-1 rounded-lg bg-primary-100 outline-1 outline-primary-600 flex gap-1">
                  {affiliation}
                </p>
              )}
            </div>
            <label className="inline-flex items-center justify-start gap-2 cursor-pointer select-none w-1/2 ">
              <input
                type="checkbox"
                value={retired ? "true" : "false"}
                onChange={(e) => {
                  setRetired(e.target.checked);
                  console.log("Retired :", e.target.checked);
                }}
                className="peer sr-only"
              />
              <div className="w-6 h-6 bg-primary-100 peer-checked:bg-primary-200 rounded-xl border border-primary-600 transition-all items-center justify-center flex">
                {retired ? <FaCheck className="w-4 h-4" /> : null}
              </div>
              <span>
                เกษียณอายุ <span className="text-error-text">*</span>
              </span>
            </label>
          </div>
          <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
          {/* -------- ความเชี่ยวชาญ --------- */}
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ความเชี่ยวชาญ</p>
            </div>
            <div className="flex">
              <div className="flex gap-2">
                <DialogInsertExpertise
                  values={expertiseMain}
                  onChange={(selected) => setExpertiseMain(selected)}
                  placeholderInput="ค้นหา..."
                  lable="เลือกความเชี่ยวชาญ"
                />
                <p>
                  สาขาความเชี่ยวชาญหลัก (OECD)
                  <span className="text-error-text mr-2">*</span>:
                </p>
              </div>
              <div className="flex flex-col ml-2">
                {expertiseMain.length != 0 &&
                  expertiseMain.map((expertiseMain, index) => {
                    const removeExpertiseMain = (i: number) =>
                      setExpertiseMain((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      );
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <p>- {expertiseMain}</p>
                        <IoCloseCircle
                          onClick={() => removeExpertiseMain(index)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-2">
                <DialogInsertExpertise
                  values={expertiseSecond}
                  onChange={(selected) => setExpertiseSecond(selected)}
                  placeholderInput="ค้นหา..."
                  lable="เลือกความเชี่ยวชาญ"
                />
                <p>
                  สาขาความเชี่ยวชาญย่อย (OECD)
                  <span className="text-error-text mr-2">*</span>:
                </p>
              </div>
              <div className="flex flex-col ml-2">
                {expertiseSecond.length != 0 &&
                  expertiseSecond.map((expertiseSecond, index) => {
                    const removeExpertiseSecond = (i: number) =>
                      setExpertiseSecond((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      );
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <p>- {expertiseSecond}</p>
                        <IoCloseCircle
                          onClick={() => removeExpertiseSecond(index)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
          {/* -------- ข้อมูลติดต่อ --------- */}
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ข้อมูลติดต่อ</p>
            </div>
            <div className="flex flex-2 gap-4 w-full">
              <div className="flex flex-col w-1/2">
                <InputCustom
                  lable="อีเมล"
                  value={contactEmail}
                  setValue={setContactEmail}
                  type="email"
                  required
                />
                <div className="flex w-full mt-4">
                  <p className="w-20 mr-2">โทรศัพท์ :</p>
                  <ListInput
                    value={contactPhone}
                    addValue={addPhone}
                    updateValue={updatePhone}
                    deleteValue={removePhone}
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2 ">
                <p>
                  ที่อยู่<span className="text-error-text">*</span>
                </p>
                <textarea
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
          {/* -------- บัญชีธนาคาร ---------  */}
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">บัญชีธนาคาร</p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2 w-1/2">
                <DailogBank
                  onSave={(sel) =>
                    setBank((prev) => ({
                      ...prev,
                      bank_logo_url: sel.logo_url,
                      bank_name: sel.bank,
                    }))
                  }
                />
                <div className="flex items-center">
                  <p>
                    ธนาคาร<span className="text-error-text">*</span> :{" "}
                  </p>
                  {bank.bank_logo_url != "" ? (
                    <img
                      src={bank.bank_logo_url}
                      className="rounded-full w-8 h-8 ml-4"
                    />
                  ) : null}
                  {bank.bank_logo_url != "" ? (
                    <p className="ml-2">{bank.bank_name}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ml-2 w-1/2">
                <InputCustom
                  lable="เลขบัญชี"
                  value={bank.bank_number}
                  setValue={(val) =>
                    setBank((prev) => ({
                      ...prev,
                      bank_number: val,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
          {/* -------- ประวัติการประเมิน ---------  */}
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ประวัติการประเมิณ</p>
            </div>
            <ListInput
              value={history}
              updateValue={updateHistory}
              addValue={addHistory}
              deleteValue={removeHistory}
            />
          </div>
          <div className="border-t-2 border-primary-900 w-full rounded-2xl my-2"></div>
          {/* -------- ลักษณะพิเศษ ---------  */}
          <div className="flex flex-col gap-2 w-full px-20">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">ลักษณะพิเศษ ของผู้ทรงคุณวุฒิ</p>
            </div>
            <ListInput
              value={characteristic}
              updateValue={updateCharacteristic}
              addValue={addCharacteristic}
              deleteValue={removeCharacteristic}
            />
          </div>
          <div className="mt-4 px-20 w-full">
            <div className="flex items-start justify-center gap-8 w-full">
              <p className="text-2xl">หมายเหตุ</p>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePerson;
