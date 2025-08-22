import { useState } from "react";
import { NavLink } from "react-router-dom";
import ChangeStatusWindow, { type Status } from "./ChangeStatusWindow";
import type { Package } from "../services/packageServices";
import { formatDate } from "../utils/formatDate";

const PackageCard = ({ item }: { item: Package }) => {
  const [isStatusTabOpen, setIsStatusTabOpen] = useState<boolean>(false);

  const {
    id,
    trackingNumber,
    senderName,
    recipientName,
    status,
    packageStatusHistory,
  } = item;

  const timestamp = new Date(packageStatusHistory[0].timestamp);
  const formattedCreatedAtDate = formatDate(timestamp);

  const toggleStatusTab = () => setIsStatusTabOpen(!isStatusTabOpen);
  const [currentPackageStatus, setCurrentPackageStatus] =
    useState<Status>(status);

  return (
    <div className="flex justify-center items-center w-80 h-52 rounded-lg border-2 border-slate-700 bg-slate-300 text-black relative">
      <div className="flex flex-col gap-0 justify-center items-start h-4/5 w-4/5 overflow-hidden">
        <p className="line-clamp-1">
          Tracking number:{" "}
          <span className="font-semibold italic">{trackingNumber}</span>
        </p>
        <p className="line-clamp-1">
          Sender: <span className="font-semibold italic">{senderName}</span>
        </p>
        <p className="line-clamp-1">
          Recipient:{" "}
          <span className="font-semibold italic">{recipientName}</span>
        </p>
        <div className="flex gap-4 items-center">
          <p>
            Status:{" "}
            <span className="font-semibold italic">{currentPackageStatus}</span>
          </p>
          <button
            onClick={toggleStatusTab}
            className="text-xs bg-slate-800 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors duration-300"
          >
            Change status
          </button>
        </div>
        <p className="line-clamp-1">
          Created at:{" "}
          <span className="font-semibold italic">{formattedCreatedAtDate}</span>
        </p>
      </div>
      <button className="absolute left-8 bottom-2 bg-slate-800 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors duration-300">
        <NavLink to={`/package/${id}`}>See Details</NavLink>
      </button>
      {isStatusTabOpen && (
        <ChangeStatusWindow
          onClose={toggleStatusTab}
          currentStatus={currentPackageStatus}
          updateStatusUI={setCurrentPackageStatus}
          packageId={id}
        />
      )}
    </div>
  );
};

export default PackageCard;
