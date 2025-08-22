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

export type PackageStatusHistory = {
  id: number;
  status: Status;
  timestamp: string;
};

type CreateNewPackage = {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
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

export const getPackageById = async (id: number): Promise<Package | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/packages/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Package = await response.json();
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

export const createNewPackage = async (packageData: CreateNewPackage) => {
  try {
    const response = await fetch(`${BASE_URL}/api/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const newPackage = (await response).json();
    return newPackage;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

export const getPackagesByStatus = async (
  status: string
): Promise<Package[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/packages/byStatus?status=${status}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Package[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch packages by status:", error);
    throw error;
  }
};

export const getPackagesByTrackingNumber = async (
  trackingNumber: string
): Promise<Package[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/packages/search?trackingNumber=${trackingNumber}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Package[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch packages by tracking number:", error);
    throw error;
  }
};
