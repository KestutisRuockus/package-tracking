import { useEffect, useState } from "react";
import {
  getPackageById,
  type Package,
  type PackageStatusHistory,
} from "../services/packageServices";
import { useParams } from "react-router-dom";
import GoBackBtn from "../components/ui/GoBackBtn";
import PageHeading from "../components/ui/PageHeading";
import PackageInputsForm from "../components/PackageInputsForm";
import ChangeStatusWindow, {
  type Status,
} from "../components/ChangeStatusWindow";
import { formatDate } from "../utils/formatDate";
import StatusWithTimestamps from "../components/ui/StatusWithTimestamps";
import StatusTimeline from "../components/ui/StatusTimeline";

const PackageDetails = () => {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode] = useState<boolean>(false);

  const [isStatusTabOpen, setIsStatusTabOpen] = useState<boolean>(false);
  const [currentPackageStatus, setCurrentPackageStatus] = useState<
    Status | undefined
  >(undefined);
  const [currentPackageStatusHistory, setCurrentPackageStatusHistory] =
    useState<PackageStatusHistory[] | []>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPackage = async () => {
      setLoading(true);

      try {
        const data = await getPackageById(+id);
        setPackageData(data);
        setCurrentPackageStatus(data?.status);
        setCurrentPackageStatusHistory(data ? data.packageStatusHistory : []);
      } catch (error) {
        setError("Failed to load packahes");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id, currentPackageStatus]);

  if (!packageData) {
    return;
  }

  const {
    trackingNumber,
    status,
    senderName,
    senderAddress,
    senderPhone,
    recipientName,
    recipientAddress,
    recipientPhone,
  } = packageData;

  const senderAndRecipientData = {
    senderName,
    senderAddress,
    senderPhone,
    recipientName,
    recipientAddress,
    recipientPhone,
  };

  const timestamp = new Date(
    currentPackageStatusHistory[
      currentPackageStatusHistory.length - 1
    ].timestamp
  );
  const formattedCreatedAtDate = formatDate(timestamp);

  const toggleStatusTab = () => setIsStatusTabOpen(!isStatusTabOpen);

  if (error) console.log(error);

  return (
    <main className="mb-16">
      <GoBackBtn />
      <PageHeading text={"Package Details"} />
      {loading && <div>Loading...</div>}
      {!packageData && <div>Package not found</div>}

      <div className="flex flex-col gap-0 w-[600px] mx-auto text-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden">
        <PackageInputsForm
          packageData={senderAndRecipientData}
          isEditMode={isEditMode}
        />
        <div className="flex w-full h-fit">
          <div className="flex flex-col w-1/2 bg-slate-300 p-8">
            <p className="">
              Tracking number:
              <span className="font-semibold italic ml-2 underline">
                {trackingNumber}
              </span>
            </p>
            <p className="">
              {currentPackageStatus} at:
              <span className="font-semibold italic ml-2 underline">
                {formattedCreatedAtDate}
              </span>
            </p>
            <StatusWithTimestamps data={currentPackageStatusHistory} />
            <div className="relative"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-1/2 bg-slate-900 min-h-20 relative">
            <p className="text-white">
              Current Package Status:{" "}
              <span className="font-semibold text-lg italic">
                {currentPackageStatus}
              </span>
            </p>
            <button
              onClick={toggleStatusTab}
              className="text-xs bg-slate-800 px-2 py-0.5 rounded-lg border-2 border-slate-400 text-white overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Change status
            </button>
            {isStatusTabOpen && (
              <ChangeStatusWindow
                onClose={toggleStatusTab}
                currentStatus={currentPackageStatus ?? status}
                updateStatusUI={setCurrentPackageStatus}
                packageId={packageData.id}
              />
            )}
          </div>
        </div>
        <div className="bg-slate-900 text-white w-full h-fit">
          <StatusTimeline data={currentPackageStatusHistory} />
        </div>
      </div>
    </main>
  );
};

export default PackageDetails;
