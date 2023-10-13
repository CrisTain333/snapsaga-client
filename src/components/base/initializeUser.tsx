import { getUser } from "@/redux/feature/user/userSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import React from "react";

const InitializeUser = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const initializeApp = async () => {
      if (token) {
        await dispatch(getUser());
      }
    };

    // Call the initialization function when the component using this hook mounts
    initializeApp();
  }, [token, dispatch]);
  return <>{children}</>;
};

export default InitializeUser;
