"use client"
import React from 'react'
import { useState ,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const tabs = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => {
    const router = useRouter();
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
  return (
    <div className='mt-8'>
    
      <span className='lg:hidden'>
      </span>
      <div className=' lg:flex flex-col p-[30px] w-[300px] bg-white shadow-2xl items-center h-max rounded-md '>
      <button onClick={()=> setTab('overview')} className={`${tab=="overview"? "bg-green-600 text-black":"bg-transparent text-black " } w-full btn  mt-3 rounded-md`}>
      overview
      </button>
      <button onClick={()=> setTab('appointments')} className={`${tab=="appointments"? "bg-green-600 text-black":"bg-transparent text-black " } w-full  btn mt-3 rounded-md`}>
      appointments
      </button>
      <button onClick={()=> setTab('profile')} className={`${tab=="profile"? "bg-green-600 text-black":"bg-transparent text-black  " } w-full btn mt-3 rounded-md`}>
      profile
      </button>
      <div className='mt-[50px] md:mt-[100px]'>
<button onClick={handleLogout} className='w-full bg-green-700 p-3 text-[16px] text-white leading-7 rounded-md'>Lougout</button>
<button className='mt-3 w-full bg-green-700 p-3 text-[16px] text-white leading-7 rounded-md'>Detelete account</button>
</div>
</div>
    </div>
  )
}

export default tabs
