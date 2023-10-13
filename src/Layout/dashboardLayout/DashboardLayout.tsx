"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { Sidebar } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }: any) => {
  const { user, token, isLoading } = useAppSelector(
    (state) => state.auth
  );

  console.log(user);
  console.log(isLoading);

  const router = useRouter();

  React.useEffect(() => {
    if (isLoading === false) {
      if (user === null && !token) {
        router.push("/auth/login?redirectTo=/dashboard");
      }
    }
  }, [user, isLoading]);

  return (
    <div className="w-[95%] mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div className="w-[50px] md:w-[225px] sticky md:mt-0 mt-[18%]">
            <DashboardSidebar />
          </div>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
