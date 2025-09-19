import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { useExpertiseStore } from "../stores/expertise";

interface propDropDown {
  values: string[];
  onChange: (values: string[]) => void;
  placeholderInput: string;
  lable: string;
}

interface DataValue {
  id: number;
  name: string;
}

function DialogInsertExpertise({
  values,
  onChange,
  placeholderInput,
  lable,
}: propDropDown) {
  const { expertise } = useExpertiseStore();

  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<DataValue[]>([]);

  const searchFilter = () => {
    if (!searchValue) {
      setData(expertise); // ถ้าไม่มีการค้นหา แสดงทั้งหมด
    } else {
      const filterData = expertise.filter((item) =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setData(filterData);
    }
  };

  const toggleSelect = (val: string) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleSave = () => {
    onChange(selectedValues);
    setOpen(false);
  };

  useEffect(() => {
    setData(expertise);
    setSelectedValues(values);
  }, [values]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-6 h-6 bg-primary-100 rounded-md border border-primary-600 items-center justify-center flex cursor-pointer hover:bg-primary-400 transition-colors"
      >
        <FaPlus />
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* ชั้นพื้นหลังโปร่งดำ คลิกเพื่อปิด */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* แผงรายการแบบเต็มจอ */}
          <div className="absolute inset-0 bg-primary-100 border-t border-primary-600 w-2/4  h-3/4 overflow-y-auto scrollbar m-auto rounded-2xl">
            <div className="sticky top-0 flex flex-col p-3 border-b border-primary-600 w-full bg-primary-200">
              <div className="flex flex-col justify-center items-center w-full">
                <span className="text-2xl">{lable}</span>
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
                    placeholder={placeholderInput}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchFilter(); // กด Enter ค้นหา
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={searchFilter}
                    className="absolute right-0 top-5 -translate-y-1/2 text-primary-50 focus:outline-none py-2 px-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-500 border-none"
                  >
                    <IoSearchSharp className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleSave();
                    setOpen(false);
                  }}
                  className="cursor-pointer px-3 py-2 bg-success-bg text-success-text outline-2 outline-success-border rounded-lg hover:bg-hv-success-bg hover:text-hv-success-text"
                >
                  บันทึก
                </button>
              </div>
              {selectedValues.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedValues.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary-300 text-primary-900"
                    >
                      {v}
                      <IoMdCloseCircle
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => toggleSelect(v)}
                      />
                    </span>
                  ))}
                  <button
                    className="text-sm underline ml-2"
                    onClick={() => setSelectedValues([])}
                  >
                    เคลียร์ทั้งหมด
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-y-auto flex flex-col px-4">
              {data.map((item) => {
                const active = selectedValues.includes(item.name);
                return (
                  <button
                    key={item.name}
                    onClick={() => toggleSelect(item.name)}
                    className={`px-3 py-2 my-1 ml-2 rounded-lg border border-primary-400 cursor-pointer text-left
                      hover:bg-primary-600 hover:text-primary-50
                      ${active ? "bg-primary-600 text-primary-50" : ""}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DialogInsertExpertise;
