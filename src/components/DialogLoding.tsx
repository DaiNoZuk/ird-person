import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DialogLoadingProps {
  isLoading: boolean;
}

function DialogLoading({ isLoading }: DialogLoadingProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center animate-spin text-9xl">
            <AiOutlineLoading3Quarters />
          </div>
        </div>
      )}
    </>
  );
}

export default DialogLoading;
