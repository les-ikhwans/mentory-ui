"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyBookings from "../bookings/page";
import Profile from "../profile/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  photo: string;
  password: string;
}

const ClientAccount = () => {
  const [tab, setTab] = useState("bookings");
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/users.json");
        const users: UserInfo[] = await response.json();
        const token = localStorage.getItem("token");
        if (token) {
          const user = JSON.parse(token) as UserInfo;
          const foundUser = users.find((u: UserInfo) => u.email === user.email);
          if (foundUser) {
            setUserInfo(foundUser);
            localStorage.setItem("userInfo", JSON.stringify(foundUser));
          } else {
            console.error("User not found in local data");
          }
        } else {
          console.error("Token not found in local storage");
        }
      } catch (error) {
        console.error("Error parsing token or fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    toast.success("You have been logged out successfully.", {
      autoClose: 1000,
      onClose: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        router.push("/pages/login");
      },
    });
  };

  const handleDemoNotification = () => {
    toast.info("This feature will be available in the full version.");
  };

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="max-w-[1170px] px-5 mx-auto mt-9">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-[50px] shadow-2xl mb-4">
          <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-green-600 mt-3">
              <img
                src={userInfo.photo}
                alt=""
                className="w-full h-full rounded-full"
              />
            </figure>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-[18px] leading-[30px] text-black font-bold">
              {userInfo.username}
            </h3>
            <p className="text-black text-[15px] leading-6 font-medium">
              {userInfo.email}
            </p>
          </div>

          <div className="mt-[50px] md:mt-[100px]">
            <button
              onClick={handleLogout}
              className="w-full bg-green-700 p-3 text-[16px] leading-7 rounded-md"
            >
              Logout
            </button>
            <button
              className="mt-3 w-full bg-green-700 p-3 text-[16px] leading-7 rounded-md"
              onClick={handleDemoNotification}
            >
              Delete account
            </button>
          </div>
        </div>
        <div className="md:col-span-2 md:px-[30px]">
          <div>
            <button
              onClick={() => setTab("bookings")}
              className={`${
                tab === "bookings" && "bg-green-600 font-normal"
              } p-2 mr-5 px-5 rounded-md text-black font-semibold text-[16px] leading-7 border border-solid border-green-600`}
            >
              My bookings
            </button>
            <button
              onClick={() => setTab("Settings")}
              className={`${
                tab === "Settings" && "bg-green-600 font-normal"
              } py-2 px-5 rounded-md text-black font-semibold text-[16px] leading-7 border border-solid border-green-600`}
            >
              Profile Settings
            </button>
          </div>
          {tab === "bookings" && <MyBookings />}
          {tab === "Settings" && (
            <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientAccount;
