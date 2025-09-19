import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
import bankData from "../data/th_banks_mock.json";
import { FaPlus } from "react-icons/fa";

interface DialogBankProps {
  onSave: (selected: Pick<BankValue, "bank" | "logo_url">) => void;
}

interface BankValue {
  id: number | null;
  bank: string;
  logo_url: string;
}

function DialogBank({ onSave }: DialogBankProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<BankValue>();
  const [data, setData] = useState<BankValue[]>([]);

  useEffect(() => {
    setData(bankData);
  }, []);

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
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-0 bg-primary-100 border-t border-primary-600 w-2/4  h-3/4 overflow-y-auto scrollbar m-auto rounded-2xl">
            <div className="sticky top-0 flex flex-col p-3 border-b border-primary-600 w-full bg-primary-200">
              <div className="flex flex-col justify-center items-center w-full">
                <span className="text-2xl">เลือกธนาคาร</span>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 text-primary-600 hover:text-primary-500 cursor-pointer"
                  aria-label="ปิด"
                >
                  <IoIosCloseCircleOutline className="w-8 h-8" />
                </button>
              </div>
              <div
                className={`flex items-center mt-2 gap-6 ${
                  selectedValue?.bank != "" ? "justify-between" : "justify-end"
                }`}
              >
                {selectedValue?.bank != "" ? (
                  <button
                    className={`
                                   mt-2 flex justify-start gap-2 items-center
                                  `}
                  >
                    <p>ธนาคารที่เลือก : {selectedValue?.bank}</p>
                    <IoMdCloseCircle
                      className="w-5 h-5 cursor-pointer"
                      onClick={() =>
                        setSelectedValue({ bank: "", logo_url: "", id: null })
                      }
                    />
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    if (!selectedValue) return;
                    onSave({
                      bank: selectedValue.bank,
                      logo_url: selectedValue.logo_url,
                    });
                    setOpen(false);
                  }}
                  className="cursor-pointer px-3 py-2 bg-success-bg text-success-text outline-2 outline-success-border rounded-lg hover:bg-hv-success-bg hover:text-hv-success-text"
                >
                  บันทึก
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-4 flex justify-center">
              <div className="grid grid-cols-4 gap-4">
                {data.map((data, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedValue(data);
                    }}
                    className={`w-40 px-3 py-2 my-1 ml-2 rounded-lg cursor-pointer hover:bg-primary-600 hover:text-primary-50 ${
                      selectedValue === data
                        ? "bg-primary-600 text-primary-50"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col items-center justify-start h-full">
                      <img
                        src={data.logo_url}
                        className="w-20 h-20 rounded-full"
                      />
                      {data.bank}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DialogBank;
