'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  _id: string;
  mentor: string;
  client: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
}

interface Mentor {
  _id: string;
  username: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  YearsInbusiness: string;
  NumberOfMentees: string;
  category: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mentors, setMentors] = useState<{ [key: string]: Mentor }>({});

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);

        response.data.forEach(async (booking: Booking) => {
          try {
            const mentorResponse = await axios.get(`http://localhost:5000/api/getMentor/${booking.mentor}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const mentorData = mentorResponse.data.data;
            console.log('Mentor Response for ID', booking.mentor, ':', mentorData);
            setMentors((prev) => ({ ...prev, [booking.mentor]: mentorData }));
          } catch (mentorError) {
            console.error('Error fetching mentor data:', mentorError);
          }
        });
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <ul>
        {bookings.map((booking) => {
          const mentor = mentors[booking.mentor];
          return (
<li key={booking._id} className="border  rounded-lg mb-4 flex flex-col md:flex-row shadow-xl">
  {mentor ? (
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
      <img src={mentor.photo} alt={mentor.username} className="w-24 h-24 rounded-full object-cover mx-5 my-5" />
    </div>
  ) : (
    <p>Loading mentor data...</p>
  )}
  <div className="flex flex-1">
    <div className="flex-1 p-4">
      {mentor && (
        <div>
          <h3 className="text-lg font-semibold">{mentor.username}</h3>
          <p className="text-sm text-gray-600">{mentor.email}</p>
          <p className="text-sm">{mentor.YearsInbusiness} years in business</p>
          <p className="text-sm">{mentor.NumberOfMentees} mentees</p>
          <p className="text-sm">Category: {mentor.category}</p>
        </div>
      )}
    </div>
    <div className="w-px h-auto bg-gray-300 "></div>
    <div className="flex-1 bg-green-500 text-white p-4 rounded-r-lg flex flex-col justify-center">
      <p className="text-sm">Date: {formatDate(booking.appointmentDate)}</p>
      <p className="text-sm">Time: {booking.appointmentTime}</p>
      <p className="text-sm">Type: {booking.appointmentType}</p>
    </div>
  </div>
</li>

          );
        })}
      </ul>
    </div>
  );
};

export default MyBookings;

