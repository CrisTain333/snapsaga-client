import BaseComponent from "@/components/base/BaseComponent";
import "../../app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Authentication",
  description:
    "SnapSaga is where every image becomes a story. We capture life's precious moments with creativity and passion, transforming them into timeless visual narratives. Experience the art of storytelling through our lens.",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BaseComponent
        className="w-full"
        showNavbar={false}
        showFooter={false}
      >
        {children}
      </BaseComponent>
    </>
  );
}
