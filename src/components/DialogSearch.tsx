import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoChevronDown, IoChevronUp, IoSearchSharp } from "react-icons/io5";

interface propDropDown {
  dataValues: DataValue[];
  value: string;
  onChange: (value: string) => void;
}

interface DataValue {
  value: string;
  label: string;
}

function CustomDropDown({ dataValues, value, onChange }: propDropDown) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [serchValue, setSerchValue] = useState("");

  return (
    <div  className="w-60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-primary-100 border border-primary-600 rounded-lg px-3 py-2 w-full flex justify-between items-center"
      >
        <span className="truncate">
          {dataValues.find((option) => option.value === value)?.label ??
            "-- สังกัด --"}
        </span>
        {open ? (
          <IoChevronUp className="text-primary-600" />
        ) : (
          <IoChevronDown className="text-primary-600" />
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* ชั้นพื้นหลังโปร่งดำ คลิกเพื่อปิด */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* แผงรายการแบบเต็มจอ */}
          <div className="absolute inset-0 bg-primary-100 border-t border-primary-600  w-3/4 h-3/4 overflow-y-auto scrollbar m-auto rounded-2xl">
            <div className="sticky top-0 flex flex-col p-3 border-b border-primary-600 w-full">
              <div className="flex justify-center items-center w-full">
                <span className="text-2xl">เลือกสังกัด</span>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 text-primary-600 hover:text-primary-500 cursor-pointer"
                  aria-label="ปิด"
                >
                  <IoIosCloseCircleOutline className="w-8 h-8" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 gap-6">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
                    placeholder="สังกัดที่ต้องการค้นหา"
                    onChange={(e) => setSerchValue(e.target.value)}
                  />
                  <button
                    type="button"
                    // onClick={serchPerson}
                    className="absolute right-0 top-5 -translate-y-1/2 text-primary-50 focus:outline-none py-2 px-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 border-none"
                  >
                    <IoSearchSharp className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    onChange(selectedValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer px-3 py-2 bg-success-bg text-success-text outline-2 outline-success-border rounded-lg hover:bg-hv-success-bg hover:text-hv-success-text"
                >
                  บันทึก
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-4">
              {dataValues.map((data) => (
                <button
                  key={data.value}
                  onClick={() => {
                    setSelectedValue(data.value);
                  }}
                  className={`px-3 py-2 my-1 rounded-lg cursor-pointer hover:bg-primary-600 hover:text-primary-50 ${
                    selectedValue === data.value
                      ? "bg-primary-600 text-primary-50"
                      : ""
                  }`}
                >
                  {data.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropDown;
