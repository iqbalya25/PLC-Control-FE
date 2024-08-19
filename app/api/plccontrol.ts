import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://plc-control-be-server-jvczhicy6q-uc.a.run.app/api/plc",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this if you need to send cookies with your requests
});

interface LampStatus {
  isOn: boolean;
}

export const getLampStatus = async (): Promise<LampStatus> => {
  try {
    const response = await api.get<{ status: string }>("/status");
    console.log("Lamp status response:", response.data);
    return { isOn: response.data.status === "ON" };
  } catch (error) {
    console.error("Error getting lamp status:", error);
    throw error;
  }
};

export const sendCommand = async (command: "ON" | "OFF"): Promise<string> => {
  try {
    const response = await api.post<string>("/command", { command });
    return response.data;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
};