import type { Status } from "./ChangeStatusWindow";

type ConfirmBoxProps = {
  newStatus: Status;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmBox = ({ newStatus, onConfirm, onClose }: ConfirmBoxProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute left-0 top-0 w-full h-full p-8 bg-black">
      <div className="text-center">
        Do you want to change the status to{" "}
        <span className="font-semibold italic text-lg">{newStatus}</span>?
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onConfirm}
          className="bg-green-700 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:border-green-700 hover:text-black transition-colors duration-300"
        >
          Yes
        </button>
        <button
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
