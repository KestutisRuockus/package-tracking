import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import {
  getAllPackages,
  getPackagesByStatus,
  type Package,
} from "../services/packageServices";
import { NavLink } from "react-router-dom";
import PageHeading from "../components/ui/PageHeading";
import { toast } from "react-toastify";
import FilterPackagesByStatus from "../components/FilterPackagesByStatus";
import { SearchByTrackingNumber } from "../components/ui/SearchByTrackingNumber";

export type FilterStatusOptions =
  | "All"
  | "Created"
  | "Sent"
  | "Accepted"
  | "Returned"
  | "Canceled";

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<FilterStatusOptions>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (error) console.log(error);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        let data: Package[] = [];

        if (selectedStatus !== "All") {
          data = await getPackagesByStatus(selectedStatus);
        } else {
          data = await getAllPackages();
        }
        setPackages(data);
      } catch (error) {
        setError("Failed to load packahes");
        console.log(error);
        toast.error("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedStatus]);

  const handleClearButton = async () => {
    setSearchQuery("");
    if (selectedStatus !== "All") {
      setSelectedStatus("All");
    } else {
      try {
        setLoading(true);
        const data: Package[] = await getAllPackages();
        setPackages(data);
      } catch (error) {
        setError("Failed to load packahes");
        console.log(error);
        toast.error("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main>
      <PageHeading text={"All Packages"} />

      <section className="p-8 flex flex-col gap-8">
        <div className="bg-slate-900 flex gap-4 items-center p-1">
          {!searchQuery && (
            <FilterPackagesByStatus
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setSearchQuery={setSearchQuery}
            />
          )}
          {searchQuery && (
            <button
              onClick={handleClearButton}
              type="button"
              className=" text-slate-900 bg-slate-300 w-36 cursor-pointer hover:bg-slate-400"
            >
              Clear Search query
            </button>
          )}
          <SearchByTrackingNumber
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPackages={setPackages}
          />
        </div>
        <div className="flex flex-wrap gap-8">
          {packages.length === 0 && (
            <div className="w-fit mx-auto text-lg text-gray-600 italic mt-6">
              {`There are no ${
                selectedStatus === "All" ? "" : `'${selectedStatus}'`
              } packages.`}
            </div>
          )}
          {loading && <p>Loading...</p>}
          {packages.map((item) => (
            <PackageCard key={item.trackingNumber} item={item} />
          ))}
        </div>
      </section>
      <NavLink
        to={"/create-package"}
        className="fixed left-6 bottom-6 w-20 h-16 rounded-lg bg-yellow-500 text-black text-xl text-center font-semibold flex items-center justify-center cursor-pointer
        hover:bg-slate-800 hover:text-white transition-colors duration-300"
      >
        Create
      </NavLink>
    </main>
  );
};

export default Packages;
