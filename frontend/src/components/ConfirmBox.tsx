type ConfirmBoxProps = {
  confirmQuestion: string | React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmBox = ({
  confirmQuestion,
  onConfirm,
  onClose,
}: ConfirmBoxProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute left-0 top-0 w-full h-full p-8 bg-black text-white">
      <div className="text-center font-semibold italic text-lg">
        {confirmQuestion}
      </div>
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={onConfirm}
          className="bg-green-700 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:border-green-700 hover:text-black transition-colors duration-300"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-700 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:border-red-700 hover:text-black transition-colors duration-300"
        >
          no
        </button>
      </div>
    </div>
  );
};

export default ConfirmBox;
