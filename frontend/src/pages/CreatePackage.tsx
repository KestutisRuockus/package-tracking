import PackageInputsForm from "../components/PackageInputsForm";
import GoBackBtn from "../components/ui/GoBackBtn";
import PageHeading from "../components/ui/PageHeading";

const CreatePackage = () => {
  return (
    <main>
      <GoBackBtn />
      <PageHeading text={"Create New Packages"} />
      <PackageInputsForm />
    </main>
  );
};

export default CreatePackage;
