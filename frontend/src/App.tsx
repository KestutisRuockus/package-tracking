import { BrowserRouter, Route, Routes } from "react-router-dom";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import CreatePackage from "./pages/CreatePackage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Packages />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/create-package" element={<CreatePackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
