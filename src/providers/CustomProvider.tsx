"use client";
import InitializeUser from "@/components/base/initializeUser";
import { getUser } from "@/redux/feature/user/userSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

const CustomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <InitializeUser>{children}</InitializeUser>
    </Provider>
  );
};

export default CustomProvider;
