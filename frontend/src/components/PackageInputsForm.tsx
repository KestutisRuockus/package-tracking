import { useState } from "react";
import { createNewPackage } from "../services/packageServices";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";

type FormState = {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
};

const initFormValues = {
  senderName: "",
  senderAddress: "",
  senderPhone: "",
  recipientName: "",
  recipientAddress: "",
  recipientPhone: "",
};

function PackageInputsForm() {
  const [formData, setFormData] = useState<FormState>(initFormValues);
  const [formErrors, setFormsErrors] = useState<FormState>({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
  });
  const [isEditMode] = useState<boolean>(false);
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalizedValue =
      value.length > 0
        ? `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`
        : "";
    setFormData((prev) => ({ ...prev, [e.target.name]: capitalizedValue }));
  };

  const handleSubmit = async (data: FormState) => {
    try {
      await createNewPackage(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleConfirmBox = () => setIsConfirmBoxOpen(!isConfirmBoxOpen);

  const validateForConfirm = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      toggleConfirmBox();
    }
  };

  const confirmQuestion = (
    <div className="flex flex-col gap-2 text-left text-white">
      <p>Do you want to create new package with these details?</p>
      <div className="flex gap-2 justify-center">
        <div className="flex flex-col gap-1 pl-4">
          <p className="text-sm">📦 Sender Name:</p>
          <span className="font-bold italic">{formData.senderName}</span>
          <p className="text-sm">🏠 Sender Address:</p>
          <span className="font-bold italic">{formData.senderAddress}</span>
          <p className="text-sm">☎ Sender Phone:</p>
          <span className="font-bold italic">{formData.senderPhone}</span>
        </div>
        <div className="flex flex-col gap-1 pl-4">
          <p className="text-sm">👤 Recipient Name</p>
          <span className="font-bold italic">{formData.recipientName}</span>
          <p className="text-sm">🏠 Recipient Address:</p>
          <span className="font-bold italic">{formData.recipientAddress}</span>
          <p className="text-sm">☎ Recipient Phone:</p>
          <span className="font-bold italic">{formData.recipientPhone}</span>
        </div>
      </div>
    </div>
  );

  const validateForm = () => {
    const errors = Object.keys(formData).reduce((acc, key) => {
      const k = key as keyof FormState;
      acc[k] = formData[k].trim() ? "" : "This Field is required";
      return acc;
    }, {} as FormState);

    setFormsErrors(errors);

    return Object.values(errors).every((err) => err === "");
  };

  return (
    <form className="w-[600px] h-fit mx-auto text-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden relative">
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col gap-4 justify-center items-center w-1/2 bg-slate-200 py-12">
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Sender Name
            </label>
            <input
              type="text"
              name="senderName"
              placeholder="Sender Name"
              value={formData.senderName}
              onChange={handleChage}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.senderName}
            </p>
          </div>
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Sender Address
            </label>
            <input
              type="text"
              name="senderAddress"
              placeholder="Sender Address"
              value={formData.senderAddress}
              onChange={handleChage}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.senderAddress}
            </p>
          </div>
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Sender Phone
            </label>
            <input
              type="number"
              name="senderPhone"
              placeholder="Sender Phone"
              value={formData.senderPhone}
              onChange={handleChage}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "." ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.senderPhone}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center w-1/2 bg-slate-300 py-12">
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              placeholder="Recipient Name"
              value={formData.recipientName}
              onChange={handleChage}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.recipientName}
            </p>
          </div>
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Recipient Address
            </label>
            <input
              type="text"
              name="recipientAddress"
              placeholder="Recipient Address"
              value={formData.recipientAddress}
              onChange={handleChage}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.recipientAddress}
            </p>
          </div>
          <div className="flex flex-col w-4/5">
            <label className="text-xs italic ps-2 font-semibold">
              Recipient Phone
            </label>
            <input
              type="number"
              name="recipientPhone"
              placeholder="Recipient Phone"
              value={formData.recipientPhone}
              onChange={handleChage}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "." ||
                  e.key === "-" ||
                  e.key === "+"
                ) {
                  e.preventDefault();
                }
              }}
              className="w-full p-1 border rounded-lg outline-none"
            />
            <p className="h-4 text-xs text-red-600 italic ps-2 font-semibold">
              {formErrors.recipientPhone}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-slate-900">
        <button
          onClick={validateForConfirm}
          type="button"
          className="my-2 px-4 py-1 bg-slate-300 rounded-lg overflow-hidden cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
        >
          {isEditMode ? "Update Package Details" : "Create New Package"}
        </button>
      </div>
      {isConfirmBoxOpen && (
        <ConfirmBox
          confirmQuestion={confirmQuestion}
          onConfirm={() => handleSubmit(formData)}
          onClose={toggleConfirmBox}
        />
      )}
    </form>
  );
}

export default PackageInputsForm;
