"use client";
import { useAppSelector } from "@/redux/hooks";
import "../../globals.css";
import type { Metadata } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// export const metadata: Metadata = {
//   title: "Booking | Snap-Saga",
//   description:
//     "SnapSaga is where every image becomes a story. We capture life's precious moments with creativity and passion, transforming them into timeless visual narratives. Experience the art of storytelling through our lens.",
//   icons: "/logo.png",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, token } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading === false) {
      if (user === null && !token) {
        router.push("/auth/login?redirectTo=/dashboard");
      }
    }
  }, [user, isLoading]);

  return <>{children}</>;
}
