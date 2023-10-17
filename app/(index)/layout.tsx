"use client";
import "@/css/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={` w-full h-full flex flex-row overflow-y-auto bg-base-100`}>
        {children}
      </body>
    </html>
  );
}
