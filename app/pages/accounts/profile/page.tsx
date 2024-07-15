"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import uploadImageToCloudinary from "../../../../utils/UploadCloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  photo: string;
  password: string;
}

interface ProfileProps {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const Profile = ({ userInfo, setUserInfo }: ProfileProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string>(userInfo.photo);
  const [formData, setFormData] = useState<UserInfo>(userInfo);
  const router = useRouter();

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData((prevData) => ({ ...prevData, photo: data.url }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUserInfo(formData);
      localStorage.setItem("userInfo", JSON.stringify(formData));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="mt-8"
        encType="multipart/form-data"
      >
        <div className="space-y-3">
          <div>
            <label className="text-base font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>

              <input
                type="text"
                name="email"
                id=""
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email to get started"
                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Your username
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="text"
                name="username"
                id=""
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
              />
            </div>
          </div>
          <div>
            <label className="text-base font-medium text-gray-900">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
            />
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="mt-2 w-32 h-32 rounded-full"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>

              <input
                type="text"
                name="password"
                id=""
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-blue-600 to-green-600 focus:outline-none hover:opacity-80 focus:opacity-80"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
