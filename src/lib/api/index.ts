import axiosInstance from "../axios";

export const getUserProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/auth/me`, {
      headers: { authorization: `${token}` },
    });
    return response?.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message);
    // return e;
  }
};
