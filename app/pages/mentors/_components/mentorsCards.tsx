import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
interface mentors {
    _id:string;
    username: string;
    email: string;
    role: string;
    photo:string;
    about:string;
    YearsInbusiness:string;
    NumberOfMentees:string;
    category:string;
    YearsOfMentoring:string;
  }
const MentorsCards = () => {
    const [mentors, setMentors] = React.useState<mentors[] | null>();

    useEffect(() => {
        const fetchMentors = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/getAllMentors');
            // Assuming the response data is in the format { success: boolean, data: Mentor[] }
            if (response.data.success) {
              setMentors(response.data.data); // Set mentors state with the array of mentors
            } else {
              console.error('Error fetching mentors:', response.data.error);
            }
          } catch (error) {
            console.error('Error fetching mentors:', error);
          }
        };
    
        fetchMentors();
      }, []);
    
  return (
    <div>
      <section className="py-10  sm:py-16 lg:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:max-w-full">
            <div className="overflow-hidden bg-white rounded shadow">
            {mentors?.map((mentor) => (
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img className="object-cover w-full h-full" src={mentor.photo} alt="" />
                        </a>

                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> {mentor.category}</span>
                        </div>
                    </div>
                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> {mentor.NumberOfMentees} Mentee</span>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black"> {mentor.username} </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">{mentor.about}</p>
                    <a href="#" title="" className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                        Continue Reading
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>))}
            </div>
        </div>

        <div className="flex items-center justify-center mt-8 space-x-3 lg:hidden">
            <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</section>

    </div>
  )
}

export default MentorsCards
