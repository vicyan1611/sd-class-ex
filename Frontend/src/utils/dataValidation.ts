import axiosInstance from "../api/config";

export const validateData = async (
  type: "email" | "phone",
  data: string | undefined,
) => {
  if (!data) return false;
  const config = await axiosInstance.get("/configurations");
  if (type == "email") {
    const domain = data.substring(data.indexOf("@"));
    if (domain === config.data.allowedDomain) return true;
    return false;
  } else {
    const regex = new RegExp(config.data.phonePattern);
    if (regex.test(data)) return true;
    return false;
  }
  return false;
};
