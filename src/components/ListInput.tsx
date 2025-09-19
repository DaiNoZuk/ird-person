import { FaPlus, FaTrash } from "react-icons/fa";

interface Prop {
  value: string[];
  updateValue: (value: string, index: number) => void;
  addValue : () => void
  deleteValue :(i: number) => void
}

function ListInput({ updateValue, value,deleteValue,addValue}: Prop) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {value.map((phone, index) => {
        const isLast = index === value.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={phone}
              onChange={(e) => updateValue(e.target.value, index)}
              inputMode="tel"
              className="py-2 px-2 rounded-lg w-full bg-primary-100 outline-1 outline-primary-600
                               focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
            />

            {/* ปุ่มเพิ่ม: แสดงเฉพาะช่องสุดท้าย */}
            {isLast && (
              <button
                onClick={addValue}
                className="w-8 h-8 bg-primary-100 rounded-md border border-primary-600 grid place-items-center
                                 cursor-pointer hover:bg-primary-400 transition-colors"
                title="เพิ่มช่องใหม่"
              >
                <FaPlus className="w-8" />
              </button>
            )}

            {/* ปุ่มลบ: แสดงถ้าไม่ใช่ช่องแรก */}
            {value.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => deleteValue(index)}
                  className="w-8 h-8 bg-error-bg text-error-text rounded-md border border-error-border grid place-items-center
                                 cursor-pointer hover:bg-hv-error-bg transition-colors"
                  title="ลบช่องนี้"
                >
                  <FaTrash />
                </button>
                {isLast ? null : <div className="w-8 h-8"></div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ListInput;
