import type { Status } from "../components/ChangeStatusWindow";

export type Package = {
  id: number;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  status: Status;
  packageStatusHistory: PackageStatusHistory[];
};

type PackageStatusHistory = {
  id: number;
  status: Status;
  timestamp: string;
};

const BASE_URL = `http://localhost:5147`;

export const getAllPackages = async (): Promise<Package[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/packages`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Package[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    throw error;
  }
};

export const updatePackageStatus = async (
  packageId: number,
  newStatus: string
): Promise<Package> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/packages/${packageId}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStatus),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status ${response.status}`);
    }

    const updatedPackage: Package = await response.json();
    return updatedPackage;
  } catch (error) {
    console.error("Failed to update package status:", error);
    throw error;
  }
};
