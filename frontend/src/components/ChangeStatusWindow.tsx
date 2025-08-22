import { useMemo, useState } from "react";
import ConfirmBox from "./ConfirmBox";
import { updatePackageStatus } from "../services/packageServices";
import { toast } from "react-toastify";

type ChangeStatusTabProps = {
  onClose: () => void;
  currentStatus: Status;
  updateStatusUI: (status: Status) => void;
  packageId: number;
};

export type Status = "Created" | "Sent" | "Accepted" | "Returned" | "Canceled";

const setValidStatusTransitions = (currStatus: Status): Status[] => {
  switch (currStatus) {
    case "Created":
      return ["Sent", "Canceled"];
      break;

    case "Sent":
      return ["Accepted", "Returned", "Canceled"];
      break;

    case "Returned":
      return ["Sent", "Canceled"];
      break;

    default:
      return [];
  }
};

const ChangeStatusWindow = ({
  onClose,
  currentStatus,
  updateStatusUI,
  packageId,
}: ChangeStatusTabProps) => {
  const validStatusList = useMemo(
    () => setValidStatusTransitions(currentStatus),
    [currentStatus]
  );

  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState<boolean>(false);

  const [newStatus, setNewStatus] = useState<Status | null>(
    validStatusList.length > 0 ? validStatusList[0] : null
  );

  const handleChangeButton = async () => {
    console.log(`New Status Of Package: ${newStatus}`);
    if (newStatus) {
      try {
        await updatePackageStatus(packageId, newStatus);
        updateStatusUI(newStatus);
        toast.success("Status changed successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to change package status. Please try again later.");
      }
      onClose();
    }
  };

  const toggleConfirmBox = () => setIsConfirmBoxOpen(!isConfirmBoxOpen);

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-slate-900/95 text-white flex flex-col gap-4 items-center justify-center">
      <p>
        Current Package Status:{" "}
        <span className="font-semibold text-lg italic">{currentStatus}</span>
      </p>
      <p>Change Status to:</p>
      {validStatusList.length === 0 ? (
        <p className="bg-slate-500 rounded-lg overflow-hidden px-2 py-0.5">
          Final status, cannot be changed
        </p>
      ) : (
        <select
          value={newStatus ?? ""}
          onChange={(e) => setNewStatus(e.target.value as Status)}
          className="bg-white text-black px-2"
        >
          {validStatusList.map((selectOption) => (
            <option key={selectOption} value={selectOption}>
              {selectOption}
            </option>
          ))}
        </select>
      )}
      <div className="flex gap-4">
        <button
          onClick={toggleConfirmBox}
          disabled={validStatusList.length === 0 ? true : false}
          className={`${
            validStatusList.length > 0
              ? "cursor-pointer hover:border-green-700 hover:text-black"
              : ""
          } 
             bg-green-700 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden transition-colors duration-300`}
        >
          Change
        </button>
        <button
          onClick={onClose}
          className="bg-red-700 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:border-red-700 hover:text-black transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
      {isConfirmBoxOpen && newStatus && (
        <ConfirmBox
          confirmQuestion={`Do you want to change status to ${newStatus}`}
          onConfirm={handleChangeButton}
          onClose={toggleConfirmBox}
        />
      )}
    </div>
  );
};

export default ChangeStatusWindow;
