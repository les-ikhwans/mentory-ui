'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Appointments from "../Appointments/page";
import MentorProfile from "../MentorProfile/page";
import Tabs from "../tabs/page";
import Loading from '@/app/_components/loading';
interface UserInfo {
    _id:string;
    username: string;
    email: string;
    role: string;
    photo:string;
    about:string;
    totalRating:number;
    averageRating:number;
    YearsInbusiness:string;
    NumberOfMentees:string;
    category:string;
    YearsOfMentoring:string;
  }
const page = () => {
    const [tab,setTab]=useState('overview');
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
      return <Loading />;;
    }
  return (
    <section className='mb-9'>
    <div className=' max-w-[1170px] px-5 mx-auto '>
      <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] '>
<Tabs tab={tab} setTab={setTab}/>
<div className='lg:col-span-2'>
<div className='mt-8' >
{tab=="overview"&& <div>
    <div className='flex items-center gap-4 mb-0'>
        <figure className='max-w-[200px] max-h-[200px]'><img src={userInfo.photo} alt="" /></figure>
        <div>
            <span className='bg-[#CCF0F3] text-[#25c7c7] py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px]leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
            {userInfo.category}</span>
                <h3 className='text-[22px] leading-9 font-bold text-black mt-3'>{userInfo.username}</h3>
                <div className='flex items-center gap-[6px] '>
                <span className='flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                
                <svg  className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
            
                    {userInfo.averageRating}
                </span>
                <span className='flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                  ({userInfo.totalRating}) 
                </span>
     </div>
     <p className='font-[15px] lg:max-w-[390px] leading-6 '></p>
        </div>
    </div>
   
    <div>
        <div>
            <h3 className='text-[22px] leading-9 font-bold text-green-600 mt-3'>about of
           <span className='text-[#25c7c7] ml-1 font-bold text-[24px] leading-9'> 
           {userInfo.username} </span>
           </h3>
           <p className=''>
           {userInfo.about}
           </p>   
        </div>
        <div>
      <section className="py-10  sm:py-16 lg:py-9">
    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Numbers tell the story</h2>
            <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-9 sm:gap-x-8 md:grid-cols-3">
            <div>
                <h3 className="font-bold text-7xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> {userInfo.YearsInbusiness} + </span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900">Years in business</p>
                <p className="text-base mt-0.5 text-gray-500">Creating the successful path</p>
            </div>

            <div>
                <h3 className="font-bold text-7xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">{userInfo.NumberOfMentees}</span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900">Number of Mentees</p>
                <p className="text-base mt-0.5 text-gray-500">In last 6 years</p>
            </div>

            <div>
                <h3 className="font-bold text-7xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> {userInfo.YearsOfMentoring} +</span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900">Years of Mentoring</p>
                <p className="text-base mt-0.5 text-gray-500">Working for your success</p>
            </div>
        </div>
    </div>
</section>

    </div>
    </div>
    </div> }
    {tab=="appointments"&& <Appointments/>}
    {tab=="profile"&& <MentorProfile/>}
</div>
</div>
      </div>
    </div>
    </section>
  )
}

export default page
