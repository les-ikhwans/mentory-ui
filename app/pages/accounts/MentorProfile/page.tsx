import React from 'react'
import { useState,useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import uploadImageToCloudinary from '../../../../utils/UploadCloudinary';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import axios from 'axios';
const MentorProfile = () => {
  
        const [selectedFile, setSelectedFile]=useState(null);
        const [previewURL, setPreviewURL]=useState("");
        const [formData, setFormData] = useState({
        userId :'',
        email: '',
        phone: '',
        username: '',
        password: '',
        role: 'client' as "client" | "mentor", 
        photo: selectedFile,
        about:'',
        category:'',
        YearsInbusiness:'',
        NumberOfMentees:'',
        YearsOfMentoring:'',
        // photo: selectedFile,
      });

      interface DecodedToken extends JwtPayload {
        userId: string; 

        // Add other properties from the decoded token if needed
      }
      const router = useRouter();

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found.');
          router.push('/login'); // Redirect to login page if no token is found
          return;
        }
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
          console.log('le decodedToken est:',decodedToken )
          const userId = decodedToken.userId;
          console.log('le userId IN decodedToken est:',userId )
          setFormData((prevData) => ({ ...prevData, userId }));
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }, [router]);
      
      const handelInputChange=(e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]:e.target.value})
      }
      const handleFileChange = async(e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file){
            console.log('no file selected')
        }
        const data=await uploadImageToCloudinary(file)
        console.log('the data is:' ,data)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({...formData,photo:data.url})
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('the id in formdata is' ,formData.userId);
            const response = await axios.post(`http://localhost:5000/api/updatementordata/${formData.userId}`,formData);
            console.log(response.data); // Log the response from the backend
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
        }
    };
    
  return (
    <div>
      <form onSubmit={handleSubmit} method="POST" className="mt-8" encType="multipart/form-data">
                    <div className="space-y-3">
                        <div>
                            <label  className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>

                                <input
                                    type="text"
                                    name="email"
                                    id=""
                                    value={formData.email}
                                    onChange={handelInputChange}
                                    placeholder="Enter email to get started"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Phone number</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="phone"
                                    id=""
                                    value={formData.phone}
                                    onChange={handelInputChange}
                                    placeholder="Enter your phone number"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> name</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="username"
                                    id=""
                                    value={formData.username}
                                    onChange={handelInputChange}
                                    placeholder="Enter your name"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> About you</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="about"
                                    id=""
                                    value={formData.about}
                                    onChange={handelInputChange}
                                    placeholder="Maximum 100 word"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Category</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="category"
                                    id=""
                                    value={formData.category}
                                    onChange={handelInputChange}
                                    placeholder="Maximum 100 word"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Years Of business</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="YearsInbusiness"
                                    id=""
                                    value={formData.YearsInbusiness}
                                    onChange={handelInputChange}
                                    placeholder="Enter a number"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Number Of Mentees you work with in last 6 years</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="NumberOfMentees"
                                    id=""
                                    value={formData.NumberOfMentees}
                                    onChange={handelInputChange}
                                    placeholder="Enter a number"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Years Of Mentoring</label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <input
                                    type="text"
                                    name="YearsOfMentoring"
                                    id=""
                                    value={formData.YearsOfMentoring}
                                    onChange={handelInputChange}
                                    placeholder="Enter a number"
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>
                        <div>
    <label className="text-base font-medium text-gray-900">Profile Photo</label>
    <input
        type="file"
        accept="image/*"
         onChange={ handleFileChange}
        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
    />
    {previewURL && <img src={previewURL} alt="Preview" className="mt-2 w-32 h-32 rounded-full" />}
</div>
                    
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Password </label>
                            </div>
                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="password"
                                    id=""
                                    value={formData.password}
                                    onChange={handelInputChange}
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
  )
}

export default MentorProfile
