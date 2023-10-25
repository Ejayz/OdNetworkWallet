import "@/css/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IndexNavbar } from "../components/IndexNavbar";
import { Montserrat } from "next/font/google";
const MontserratFont = Montserrat({
  subsets: [
    "latin",
    "latin-ext",
    "cyrillic",
    "cyrillic-ext",
    "vietnamese",
    "latin",
    "latin-ext",
    "cyrillic",
    "cyrillic-ext",
    "vietnamese",
  ],
  variable: "--font-montserrat",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`w-full h-full overflow-y-auto font-monst bg-white ${MontserratFont.variable}`}
      >
        <IndexNavbar></IndexNavbar>
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
        <ToastContainer />
      </body>
    </html>
  );
}
