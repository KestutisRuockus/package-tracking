import type React from "react";
import type { Dispatch } from "react";
import {
  getAllPackages,
  getPackagesByTrackingNumber,
  type Package,
} from "../../services/packageServices";

type SearchByTrackingNumberProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  setPackages: Dispatch<React.SetStateAction<Package[]>>;
};

export const SearchByTrackingNumber = ({
  searchQuery,
  setSearchQuery,
  setPackages,
}: SearchByTrackingNumberProps) => {
  const handleSubmit = async () => {
    if (searchQuery === "") {
      const data = await getAllPackages();
      setPackages(data);
    } else {
      const data = await getPackagesByTrackingNumber(searchQuery);
      setPackages(data);
    }
  };

  return (
    <div className="flex">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        className="px-2 text-slate-900 bg-slate-300 outline-none"
      />
      <svg
        onClick={handleSubmit}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={24}
        height={24}
        className="bg-slate-300 cursor-pointer hover:bg-slate-500 transition-colors duration-300"
      >
        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
      </svg>
    </div>
  );
};
