"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";

interface UserInfo {
  username: string;
  email: string;
}

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = JSON.parse(token) as UserInfo;
          setUserInfo(user);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // Fetch user info on component mount
    fetchUserInfo();

    // Set up an event listener for local storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        fetchUserInfo();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className=" flexBetween max-container padding-container relative z-30 -mt-3 -mb-10 ">
      <Link href="/">
        <Image
          src="/Digital.png"
          alt="logo"
          width={174}
          height={29}
          className="md: w-30 h-30 "
        />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
      {userInfo ? (
        <Link href="/pages/accounts/Clientaccount" passHref>
          <div className="lg:flexCenter hidden">
            <Button
              type="button"
              title={userInfo.username}
              icon="/user.svg"
              variant="btn_dark_green"
            />
          </div>
        </Link>
      ) : (
        <Link href="/pages/login">
          <div className="lg:flexCenter hidden">
            <Button
              type="button"
              title="login"
              icon="/user.svg"
              variant="btn_dark_green"
            />
          </div>
        </Link>
      )}

      <Image
        src="menu.svg"
        alt=""
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden "
      />
    </nav>
  );
};

export default Navbar;
