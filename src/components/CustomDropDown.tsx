import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface propDropDown {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

function CustomDropDown({options,value,onChange}: propDropDown) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-60">
      {/* ปุ่มหลัก */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-primary-100 border border-primary-600 rounded-lg px-3 py-2 w-full flex justify-between items-center"
      >
        <span className="truncate">{options.find((option) => option.value === value)?.label ?? "-- สังกัด --"}</span>
        {open ? (
          <IoChevronUp className="text-primary-600" />
        ) : (
          <IoChevronDown className="text-primary-600" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute mt-1 bg-white border border-primary-600 rounded-lg w-full z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-primary-100 cursor-pointer rounded-lg"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropDown;
