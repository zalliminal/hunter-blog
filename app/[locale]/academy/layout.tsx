import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
