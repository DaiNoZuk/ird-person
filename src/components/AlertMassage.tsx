import { IoIosCloseCircleOutline } from "react-icons/io";

interface AlertMassageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  massage: string;
}

function AlertMassage({ open, setOpen, title, massage }: AlertMassageProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-0 bg-primary-100 border-t border-primary-600 w-2/4 h-2/4 m-auto rounded-2xl flex flex-col justify-between items-center py-4">
            <span className="text-4xl">{title}</span>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-primary-600 hover:text-primary-500 cursor-pointer"
              aria-label="ปิด"
            >
              <IoIosCloseCircleOutline className="w-8 h-8" />
            </button>
            <p className="text-2xl mt-4">{massage}</p>
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer px-3 py-2 bg-error-bg text-error-text outline-2 outline-error-border rounded-lg hover:bg-hv-error-bg hover:text-hv-error-text"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AlertMassage;
