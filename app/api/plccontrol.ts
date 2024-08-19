import axios from "axios";

const api = axios.create({
  baseURL: "https://plc-control-be-server-jvczhicy6q-uc.a.run.app/api/plc",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLampStatus = async () => {
  try {
    const response = await api.get("/status");
    console.log("Lamp status response:", response.data);
    return { isOn: response.data.status === "ON" };
  } catch (error) {
    console.error("Error getting lamp status:", error);
    throw error;
  }
};

export const sendCommand = async (command: "ON" | "OFF") => {
  try {
    const response = await api.post("/command", { command });
    return response.data;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
};
