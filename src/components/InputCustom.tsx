interface InputCustomProps {
  lable: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  type?: string;
}

function InputCustom({
  lable,
  value,
  setValue,
  required = false,
  type = "text",
}: InputCustomProps) {
  return (
    <div className="flex flex-col ">
      <p>
        {lable}
        {required && <span className="text-error-text">*</span>}
      </p>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="py-2 px-2 rounded-lg w-full pr-10 bg-primary-100 outline-1 outline-primary-600 focus:outline-2 focus:outline-primary-600 focus:bg-primary-200"
      />
    </div>
  );
}

export default InputCustom;
