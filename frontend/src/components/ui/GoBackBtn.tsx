import { NavLink } from "react-router-dom";

const GoBackBtn = () => {
  return (
    <NavLink
      to={"/"}
      className="fixed left-6 top-6 w-24 h-16 rounded-lg bg-yellow-500 text-black text-xl text-center font-semibold flex items-center justify-center cursor-pointer
           hover:bg-slate-800 hover:text-white transition-colors duration-300"
    >
      Go Back
    </NavLink>
  );
};

export default GoBackBtn;
