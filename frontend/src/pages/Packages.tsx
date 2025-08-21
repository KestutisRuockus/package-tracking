import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { getAllPackages, type Package } from "../services/packageServices";
import { NavLink } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (error) console.log(error);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getAllPackages();
        setPackages(data);
      } catch (error) {
        setError("Failed to load packahes");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <main className="p-8 flex flex-wrap gap-8">
      {loading && <p>Loading...</p>}
      {packages.map((item) => (
        <PackageCard key={item.trackingNumber} item={item} />
      ))}
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
