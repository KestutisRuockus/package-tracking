import { BrowserRouter, Route, Routes } from "react-router-dom";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import CreatePackage from "./pages/CreatePackage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Packages />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/create-package" element={<CreatePackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
