import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../_components/loading'; // Import the custom loading component

interface Booking {
  _id: string;
  client: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentPrice: string;
  ticketPrice: number;
  isPaid: boolean;
}

interface Client {
  _id: string;
  username: string;
  email: string;
  photo: string;
  phone: string;
}

const Appointments: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<{ [key: string]: Client }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = response.data;
        setBookings(bookingsData);

        const clientRequests = bookingsData.map((booking: Booking) =>
          axios.get(`http://localhost:5000/api/getClient/${booking.client}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const clientsResponses = await Promise.all(clientRequests);
        const clientsData = clientsResponses.reduce((acc: { [key: string]: Client }, clientResponse) => {
          const client = clientResponse.data.data; // Adjust if your API returns data differently
          acc[client._id] = client;
          return acc;
        }, {});

        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching bookings or client data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = async (phoneNumber: string) => {
    try {
      const response = await axios.post('http://localhost:5000/send-message', {
        phoneNumber,
      });
      console.log('Response from /send-message:', response.data); // Log the response
      if (response.data.status) {
        alert('Message sent successfully');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (bookings.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <table className='w-full text-left text-sm text-gray-500'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='px-6 py-3'>Name</th>
          <th scope='col' className='px-6 py-3'>Payment</th>
          <th scope='col' className='px-6 py-3'>Price</th>
          <th scope='col' className='px-6 py-3'>Booked On</th>
          <th scope='col' className='px-6 py-3'>Confirm</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => {
          const client = clients[booking.client];
          return (
            <tr key={booking._id}>
              <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                {client ? (
                  <>
                    <img
                      src={client.photo || '/default-avatar.jpg'}
                      className='w-10 h-10 rounded-full'
                      alt={client.username}
                    />
                    <div className='pl-3'>
                      <div className='text-base font-semibold'>{client.username}</div>
                      <div className='text-gray-500'>{client.email}</div>
                    </div>
                  </>
                ) : (
                  <div>Loading client data...</div>
                )}
              </th>
              <td className='px-6 py-4'>{booking.isPaid ? 'Paid' : 'Pending'}</td>
              <td className='px-6 py-4'>${booking.appointmentPrice}</td>
              <td className='px-6 py-4'>{new Date(booking.appointmentDate).toLocaleDateString()}</td>
              <td className='px-6 py-4'>
                <button
                  className='bg-green-500 text-white px-3 py-1 rounded'
                  onClick={() => client && handleConfirm(client.phone)}
                >
                  Confirm
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Appointments;
