"use client";
import Avatar from "boring-avatars";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
type NavBarInfo = {
  username: string;
};
export function NavbarDashboard({ username }: NavBarInfo) {
  const nav = useRouter();
  return (
    <div className="navbar bg-white shadow-xl font-monst text-base-content text-2xl w-full">
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1]  shadow bg-white rounded-box w-52 "
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a href="/" className="">
          <Image
            src="/pngs/odn4-tr.png"
            width="200"
            height="200"
            alt={"Logo"}
          ></Image>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/user/dashboard">Dashboard</a>
          </li>
          <li tabIndex={2} className="block">
            <details>
              <summary>Wallet</summary>
              <ul className="p-2 ">
                <li>
                  <a>Block Chain Coins</a>
                </li>
                <li>
                  <a>Network Coins</a>
                </li>
                <li>
                  <a>Tokens</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Faucet List</a>
          </li>
          <li>
            <a>Merchant List</a>
          </li>
          <li>
            <a>Accounts</a>
          </li>
          <li>
            <button
              onClick={async (e) => {
                e.preventDefault();
                let headersList = {
                  Accept: "*/*",
                  "User-Agent":
                    "Thunder Client (https://www.thunderclient.com)",
                };

                let response = await fetch("/api/post/auth/logout/", {
                  method: "POST",
                  headers: headersList,
                });

                let data = await response.json();
                if (response.status == 200) {
                  toast.success(data.message);
                  nav.push("/auth/login");
                } else if (response.status == 400) {
                  toast.error(data.message);
                } else {
                  toast.error("Something went wrong. Please try again later.");
                }
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="ml-auto mr-6">
        <div className="avatar ">
          <div className="w-12 rounded-full">
            <img
              src={`https://source.boringavatars.com/beam/120/${
                username || "default"
              }?colors=216778,189bcc,e9c46a,C271B4,189bcc`}
            />
          </div>
        </div>

        <span> {username || "Fetching..."}</span>
      </div>
    </div>
  );
}
