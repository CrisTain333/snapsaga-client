export const setToLocalStorage = (
  key: string,
  token: string
) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  console.log("hello from get Token LocalStorage");
  return localStorage.getItem(key);
};
