"use client"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserInfo {
  _id:string;
  username: string;
  email: string;
  role: string;
  // Add other properties as needed
}

const ProfilePage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token is', token);
    if (!token) {
      // Redirect to login if token is not available
      router.push('/pages/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logout');
      if (response.status === 200) {
        // Clear local storage and redirect to login page
        localStorage.removeItem('token');
        router.push('/pages/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
       <h1>Welcome, {userInfo._id}</h1>
      
      <h1>Welcome, {userInfo.username}</h1>
      <h1>Welcome, {userInfo.role}</h1>
      <br /><br />
      <button type="button" onClick={handleLogout}>Logout</button>
      <p></p>
    </div>
  );
};

export default ProfilePage;