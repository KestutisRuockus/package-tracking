import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { getAllPackages, type Package } from "../services/packageServices";

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
    </main>
  );
};

export default Packages;
