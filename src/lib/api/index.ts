import axiosInstance from "../axios";
import { instance } from "../axios/axiosInstance";

export const getUserProfile = async (token: string) => {
  try {
    const response = await instance.get(`/auth/me`, {
      headers: { authorization: `${token}` },
    });
    return response?.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message);
    // return e;
  }
};
