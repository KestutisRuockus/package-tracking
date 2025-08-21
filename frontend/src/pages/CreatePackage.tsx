import { NavLink } from "react-router-dom";
import PackageInputsForm from "../components/PackageInputsForm";

const CreatePackage = () => {
  return (
    <main>
      <NavLink
        to={"/"}
        className="fixed left-6 top-6 w-24 h-16 rounded-lg bg-yellow-500 text-black text-xl text-center font-semibold flex items-center justify-center cursor-pointer
           hover:bg-slate-800 hover:text-white transition-colors duration-300"
      >
        Go Back
      </NavLink>
      <h1 className="w-fit mx-auto text-5xl font-bold uppercase italic my-16">
        Create New Package
      </h1>
      <PackageInputsForm />
    </main>
  );
};

export default CreatePackage;
