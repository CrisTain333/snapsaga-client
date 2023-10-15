import "../../globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Booking | Snap-Saga",
  description:
    "SnapSaga is where every image becomes a story. We capture life's precious moments with creativity and passion, transforming them into timeless visual narratives. Experience the art of storytelling through our lens.",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
