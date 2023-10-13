import BaseComponent from "@/components/base/BaseComponent";
import "../globals.css";
import type { Metadata } from "next";
import DashboardLayout from "@/Layout/dashboardLayout/DashboardLayout";
export const metadata: Metadata = {
  title: "Dashboard | Snap-Saga",
  description: "SnapSaga Dashboard",
  icons: "/public/logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseComponent
      showNavbar={true}
      className="w-full"
      showFooter={false}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </BaseComponent>
  );
}
