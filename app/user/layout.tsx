"use client";
import "@/css/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarDashboard } from "../components/NavbarDashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookie_processor from "@/hooks/processor";
import { JwtPayload } from "jsonwebtoken";
import { Montserrat } from "next/font/google";
const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<any>("");
  const route = useRouter();
  useEffect(() => {
    async function init() {
      let data = await cookie_processor(window.document.cookie);
      if (data == null) {
        route.push("/?error=401");
      } else {
        setData(data);
      }
    }
    init();
  }, []);

  return data == "" ? (
    <html lang="en">
      <body
        className={`w-screen h-screen flex flex-col font-monst bg-white overflow-y-auto  ${MontserratFont.variable}`}
      >
        <div className="h-full w-full bg-white flex">
          <div className="mx-auto my-auto">
            <h1 className="text-base-content text-2xl mx-auto">
              Please wait while we load some things...
            </h1>
          </div>
        </div>
      </body>
    </html>
  ) : (
    <html lang="en">
      <body
        className={`w-full h-full flex flex-col font-monst bg-white overflow-y-auto  ${MontserratFont.variable}`}
      >
        <NavbarDashboard username={data.user_metadata.username} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {children}
      </body>
    </html>
  );
}
