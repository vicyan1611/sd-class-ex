import axiosInstance from "../api/config";

export const validateData = async (
  type: "email" | "phone",
  data: string | undefined,
) => {
  if (!data) return false;
  const response = await axiosInstance.get("/configurations");
  if (type == "email") {
    const domain = data.substring(data.indexOf("@"));
    console.log(domain, response.data[0].emailDomain);
    if (domain === response.data[0].emailDomain) return true;
    return false;
  } else {
    const regex = new RegExp(response.data[0].phonePattern);

    if (regex.test(data)) return true;
    return false;
  }
  return false;
};

export const validateStatusTransition = async (
  from_status_id: number | undefined,
  to_status_id: number | undefined,
) => {
  if (!from_status_id) return false;
  if (!to_status_id) return false;
  const response = await axiosInstance.get("/status-transitions");
  const transitions = response.data;
  for (let i = 0; i < transitions.length; i++) {
    if (
      transitions[i].from_status_id === from_status_id &&
      transitions[i].to_status_id === to_status_id
    ) {
      return true;
    }
  }
  return false;
};
